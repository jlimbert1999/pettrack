import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { existsSync, unlinkSync } from 'fs';
import { unlink, writeFile, access, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

type ValidFolder = 'pets';
@Injectable()
export class FilesService {
  constructor(private configService: ConfigService) {}

  getStaticFile(filename: string) {
    const path = join(__dirname, '..', '..', '..', 'static', 'uploads', 'pets', 'images', filename);
    if (!existsSync(path)) {
      throw new BadRequestException(`No file found with ${filename}`);
    }
    return path;
  }

  async saveFile(file: Express.Multer.File): Promise<{ filename: string }> {
    const fileExtension = file.mimetype.split('/')[1];
    const folterPath = join(__dirname, '..', '..', '..', 'static', 'uploads', 'pets', 'images');
    await this.ensureFolderExists(folterPath);
    const savedFileName = `${uuid()}.${fileExtension}`;
    const path = join(folterPath, savedFileName);
    try {
      await writeFile(path, file.buffer);
      return { filename: savedFileName };
    } catch (error) {
      throw new InternalServerErrorException('Error saving file');
    }
  }
  async deleteFiles(files: string[]) {
    const basePath = join(__dirname, '..', '..', '..', 'static', 'uploads', 'pets', 'images');

    const tasks = files.map((file) => {
      const filePath = join(basePath, file);
      return unlink(filePath); // unlink falla si no existe
    });

    const results = await Promise.allSettled(tasks);

    for (const result of results) {
      if (result.status === 'rejected' && result.reason.code !== 'ENOENT') {
        throw new InternalServerErrorException();
      }
    }
  }

  buildFileUrl(filename: string, folder: ValidFolder): string {
    const host = this.configService.getOrThrow('host');
    return `${host}/files/${folder}/${filename}`;
  }

  private async ensureFolderExists(path: string): Promise<void> {
    if (!existsSync(path)) {
      await mkdir(path, { recursive: true });
    }
  }
}
