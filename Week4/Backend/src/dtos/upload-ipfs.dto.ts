import { ApiProperty } from '@nestjs/swagger';

export class UploadIpfsDto {
  @ApiProperty({
    required: true,
    description: 'Id of the file',
  })
  id: number;
}
