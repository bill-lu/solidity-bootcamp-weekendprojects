import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { Blob } from 'buffer';
import { AppService } from './app.service';
import { FileDataDto } from './dtos/file-data.dto';
import { SetMetadataDto } from './dtos/set-metadata.dto';
import { UploadIpfsDto } from './dtos/upload-ipfs.dto';

@ApiTags('file')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @ApiOperation({
    summary: 'Database contents',
    description: 'Gets the Database contents of this server',
  })
  @ApiResponse({
    status: 200,
    description: 'Database contents',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getAllData() {
    try {
      return this.appService.getAll();
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('ipfs')
  @ApiOperation({
    summary: 'IPFS node connection',
    description: 'Returns true if the IPFS Node configured is running',
  })
  @ApiResponse({
    status: 200,
    description: 'IPFS Node connection',
    type: Boolean,
  })
  async ipfsOnline() {
    try {
      return this.appService.isIpfsNodeOnline();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get element by id',
    description: 'Gets the element at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getData(@Param('id') id: number) {
    try {
      return this.appService.get(id);
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('file/:id')
  @ApiOperation({
    summary: 'Get file of element by id from server storage',
    description: 'Gets the file of element at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element file',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getFile(@Response({ passthrough: true }) res, @Param('id') id: number) {
    try {
      const fileData = this.appService.get(id).file;
      res.set({
        'Content-Type': fileData.mimetype,
        'Content-Disposition': `attachment; filename="${fileData.fileName}"`,
      });
      const fileStream = this.appService.getFileStream(fileData.storageName);
      return fileStream;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('ipfs-get/:id')
  @ApiOperation({
    summary: 'Get file of element by id from ipfs',
    description: 'Gets the file of element at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element file',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getFileIpfs(
    @Response({ passthrough: true }) res,
    @Param('id') id: number,
  ) {
    try {
      const fileData = this.appService.get(id).file;
      const fileStream = await this.appService.getFromIpfs(id);
      res.set({
        'Content-Type': fileData.mimetype,
        'Content-Disposition': `attachment; filename="${fileData.fileName}"`,
      });
      return fileStream;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 503);
    }
  }

  @Post('file')
  @ApiOperation({
    summary: 'Register file',
    description: 'Registers a file in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'File registered',
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: HttpException,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileData = new FileDataDto(
      file.originalname,
      file.mimetype,
      file.filename,
      file.size,
    );
    if (file.size > 10000000) {
      throw new HttpException('File too big', 413);
    }
    const savedObj = this.appService.pushFile(fileData);
    return savedObj;
  }

  @Post('metadata')
  @ApiOperation({
    summary: 'Register file metadata',
    description: 'Registers a metadata for a file',
  })
  @ApiResponse({
    status: 200,
    description: 'Metadata registered',
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: HttpException,
  })
  setMetadata(@Body() body: SetMetadataDto) {
    const updatedObj = this.appService.setMetadata(body.id, body.metadata);
    return updatedObj;
  }

  @Post('ipfs-save')
  @ApiOperation({
    summary: 'Register file metadata',
    description: 'Registers a metadata for a file',
  })
  @ApiResponse({
    status: 200,
    description: 'Metadata registered',
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: HttpException,
  })
  sendFileIpfs(@Body() body: UploadIpfsDto) {
    const updatedObj = this.appService.saveToIpfs(body.id);
    return updatedObj;
  }
}
