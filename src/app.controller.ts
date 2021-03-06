import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files) {
    let img = [];
    for (let f of files) {
      let base64 =
        'data:' +
        f.mimetype +
        ';base64,' +
        Buffer.from(f.buffer).toString('base64');
      img.push(base64);
    }
    return { img };
  }

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFile(@UploadedFile() f) {
    let img =
      'data:' +
      f.mimetype +
      ';base64,' +
      Buffer.from(f.buffer).toString('base64');
    return { img };
  }
}
