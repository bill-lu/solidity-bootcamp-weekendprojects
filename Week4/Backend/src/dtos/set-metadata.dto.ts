import { ApiProperty } from '@nestjs/swagger';
import { MetadataDto } from './metadata.dto';

export class SetMetadataDto {
  @ApiProperty({
    required: true,
    description: 'Id of the file',
  })
  id: number;
  @ApiProperty({
    required: true,
    description: 'File metadata',
    type: MetadataDto
  })
  metadata: MetadataDto;
}
