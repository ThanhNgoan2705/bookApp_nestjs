import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/image',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileReponse = {
      originalname: file.originalname,
      filename: '/image/' + file.filename,
    };
    return fileReponse;
  }

  @Post('pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pdf',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const fileReponse = {
      originalname: file.originalname,
      filename: '/pdf/' + file.filename,
    };
    return fileReponse;
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatar',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const fileReponse = {
      originalname: file.originalname,
      filename: '/avatar/' + file.filename,
    };
    return fileReponse;
  }

  @Post('banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/banner',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async uploadBanner(@UploadedFile() file: Express.Multer.File) {
    const fileReponse = {
      originalname: file.originalname,
      filename: '/banner/' + file.filename,
    };
    return fileReponse;
  }
}
