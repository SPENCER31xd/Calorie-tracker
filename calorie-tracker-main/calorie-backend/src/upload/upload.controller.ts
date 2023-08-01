import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService:UploadService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const key = `${uuidv4()}${Date.now()}`
        const response = await this.uploadService.uploadImage(file, key)
        return response
    }
}
