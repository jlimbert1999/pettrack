import { FileValidator } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

export class CustomUploadFileTypeValidator extends FileValidator {
  constructor(protected readonly validExtensions: string[]) {
    super(validExtensions);
  }

  async isValid(file?: Express.Multer.File): Promise<boolean> {
    if (!file) return false;

    const detected = await fileTypeFromBuffer(file.buffer);
    if (!detected) return false;
    return this.validExtensions.includes(detected.ext);
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `${file.mimetype.split('/')[1]} is not valid. Only files allowed: ${this.validExtensions.join(', ')}`;
  }
}
