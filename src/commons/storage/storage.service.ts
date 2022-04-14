import { Logger, Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AWS_CONFIG } from '../../enum';

@Injectable()
export class UploadImageService {
  constructor(@Inject(AWS_CONFIG.PROVIDER) private readonly s3Provider) {}

  async upload(file) {
    const { originalname } = file;
    const S3bucket = this.s3Provider.getBucketName();
    return await this.uploadS3(file.buffer, S3bucket, originalname);
  }

  async getObject(fileName) {
    const s3 = this.s3Provider.getS3();
    const s3Params = {
      Bucket: this.s3Provider.getBucketName(),
      Key: fileName,
    };
    return new Promise((resolve, reject) => {
      s3.getObject(s3Params, (err, data) => {
        if (err && err.code === 'NoSuchKey') {
          Logger.error({ 's3 getObject error': err });
          reject(err);
        }
        resolve({
          uri: process.env.CLOUDFRONT_URL + s3Params.Key,
          key: s3Params.Key,
        });
      });
    });
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.s3Provider.getS3();
    const s3Params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    const data = await this.uploadImageToS3(s3, s3Params);
    return data;
  }

  async uploadImageToS3(s3: S3, s3Params) {
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (err, data) => {
        if (err) {
          Logger.error({ 's3 upload error': err });
          reject(err);
        }
        data.Location = process.env.CLOUDFRONT_URL + data.Key;
        resolve(data);
      });
    });
  }
}
