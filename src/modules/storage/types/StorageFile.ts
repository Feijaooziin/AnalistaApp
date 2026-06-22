export interface StorageFile {
  id?: number;
  name: string;
  originalName: string;
  extension: string;
  mimeType: string;
  fileType: string;
  size: number;
  localUri: string;
  createdAt?: string;
}
