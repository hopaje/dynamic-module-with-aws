import { Module } from '@nestjs/common';
import { UploadImageController } from './storage.controller';
import { UploadImageService } from './storage.service';
@Module({
  controllers: [UploadImageController],
  providers: [UploadImageService],
  exports: [UploadImageService],
})
export class StorageModule {}
