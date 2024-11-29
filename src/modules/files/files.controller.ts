import { Controller, Get, Param, ParseFilePipeBuilder, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { FilesService } from './files.service';
import { CustomUploadFileTypeValidator } from './validators/upload-file-type.validator';
import { Public } from '../auth/decorators';

@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}
  @Post('pets')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(new CustomUploadFileTypeValidator(['png', 'jpg', 'jpeg']))
        .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.saveFile(file);
  }

  @Public()
  @Get('pets/:imageName')
  findPetImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.fileService.getStaticFile(imageName);
    res.sendFile(path);
  }
}
