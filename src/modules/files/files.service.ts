import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { existsSync, unlinkSync } from 'fs';
import { unlink, writeFile, access } from 'fs/promises';
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
    const savedFileName = `${uuid()}.${fileExtension}`;
    const path = join(__dirname, '..', '..', '..', 'static', 'uploads', 'pets', 'images', savedFileName);
    try {
      await writeFile(path, file.buffer);
      return { filename: savedFileName };
    } catch (error) {
      throw new InternalServerErrorException('Error saving file');
    }
  }

  async deleteFiles(files: string[]) {
    const tempDir = join(__dirname, '..', '..', '..', 'static', 'uploads', 'pets', 'images');
    try {
      for (const file of files) {
        const filePath = join(tempDir, file);
        await access(filePath);
        await unlink(filePath);
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  buildFileUrl(filename: string, folder: ValidFolder): string {
    const host = this.configService.getOrThrow('host');
    return `${host}/files/${folder}/${filename}`;
  }
}
