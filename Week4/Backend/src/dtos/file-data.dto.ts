export class FileDataDto {
  constructor(
    public fileName: string,
    public mimetype: string,
    public storageName: string,
    public size: number,
  ) {}
}
