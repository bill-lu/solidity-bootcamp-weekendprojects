import { FileDataDto } from 'src/dtos/file-data.dto';
import { IpfsDataDto } from 'src/dtos/ipfs-data.dto';
import { MetadataDto } from 'src/dtos/metadata.dto';

export class FileData {
  constructor(
    public file?: FileDataDto,
    public metadata?: MetadataDto,
    public ipfs?: IpfsDataDto,
  ) {}
}
