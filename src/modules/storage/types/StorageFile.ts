export interface StorageFile {
  id?: number;
  name: string;
  originalName: string;
  extension: string;
  mimeType: string;
  fileType: "pdf" | "image" | "video" | "excel" | "word" | "other";
  size: number;
  localUri: string;
  createdAt?: string;
}
