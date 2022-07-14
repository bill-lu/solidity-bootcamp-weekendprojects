import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    required: true,
    description: 'Name of this object',
    examples: ['Foo', 'Bar', 'Steven'],
  })
  name: string;
  @ApiProperty({
    required: false,
    description: 'Description for this object',
  })
  description?: string;
  @ApiProperty({
    required: false,
    description: 'Author of this object',
  })
  author?: string;
  @ApiProperty({
    required: false,
    description: 'Timestamp of creation date of this object',
  })
  timestamp?: number;
  @ApiProperty({
    required: false,
    description: 'Given type for this object',
    examples: ['Document', 'Meme', 'Dolphin', 'Undefined'],
  })
  type?: string;
  @ApiProperty({
    required: false,
    description: 'Given class for this object',
    examples: [
      'Legendary',
      'Common',
      'Confidential',
      'Round',
      'Large',
      'Warrior',
      'Hyena',
      'Steven',
    ],
  })
  class?: string;
  @ApiProperty({
    required: false,
    description: 'Given score for this object',
    examples: [0, -1, 42, 9876543210],
  })
  score?: number;
}
