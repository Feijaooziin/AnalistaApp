import type { FileType } from "@/src/modules/storage/utils/getFileType";

export interface StorageFile {
  id?: number;
  name: string;
  originalName: string;
  extension: string;
  mimeType: string;
  fileType: FileType;
  size: number;
  localUri: string;
  thumbnailUri?: string;
  createdAt?: string;
}
