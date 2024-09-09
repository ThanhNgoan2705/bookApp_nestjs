import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFileService {
  uploadFile(file: Express.Multer.File) {
    const fileReponse = {
      originalname: file.originalname,
      filename: file.filename,
      path: 'assets/' + file.filename,
    };
    return fileReponse;
  }
}
