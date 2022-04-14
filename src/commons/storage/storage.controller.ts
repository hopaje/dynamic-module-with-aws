import {
  Post,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Controller,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { ImageFileDTO, ImageResponseDTO } from './dto/image.dto';
import { UploadImageService } from './storage.service';

@Controller('upload')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { limits: { files: 1 } }))
  @ApiResponse({ status: HttpStatus.CREATED, type: ImageResponseDTO })
  async upload(@UploadedFile() file: ImageFileDTO, @Res() response) {
    try {
      const data: ImageResponseDTO = await this.uploadImageService.upload(file);
      return response.status(200).json({
        message: `Image ${file.originalname} uploaded to S3`,
        data,
      });
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image to S3: ${error.message}`);
    }
  }

  @Get('/:fileName')
  async getImageByName(@Req() req, @Res() res) {
    try {
      const { fileName } = req.params;
      const data: any = await this.uploadImageService.getObject(fileName);

      return res.status(200).json({
        message: `Image '${data.key}' downloaded from S3`,
        data,
      });
    } catch (error) {
      return res
        .status(500)
        .json(`Failed to download image from S3: ${error.message}`);
    }
  }
}
