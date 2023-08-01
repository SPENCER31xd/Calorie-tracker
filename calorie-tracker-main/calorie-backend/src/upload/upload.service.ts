import { Injectable } from '@nestjs/common';
import {S3Client, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput} from '@aws-sdk/client-s3'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class UploadService {
    private region: string
    private s3: S3Client

    constructor(private configService: ConfigService) {
        this.region = process.env.AWS_REGION
            this.s3 = new S3Client({
                region: this.region,
                credentials: {
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    accessKeyId: process.env.AWS_ACCESS_KEY
                }
            })
    }

    async uploadImage(file: Express.Multer.File, key: string) {
        const bucket = 'e-commerce-product-images'
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }

        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input)
            )
            if (response) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`
            }
        } catch (error) {
            console.log(error)
        }
    }
}
