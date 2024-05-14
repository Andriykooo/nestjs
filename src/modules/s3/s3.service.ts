import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
  }

  async uploadFile(key: string, file: Buffer): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file,
    };

    const response = await this.s3.upload(params).promise();

    return response.Location;
  }

  async getFile(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
    };

    return await this.s3.getObject(params).promise();
  }
}
