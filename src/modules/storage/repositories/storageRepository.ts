import { db } from "@/src/database/db";
import { StorageFile } from "../types/StorageFile";

export const storageRepository = {
  async create(file: StorageFile) {
    await db.runAsync(
      `
      INSERT INTO storage_files (
        name,
        original_name,
        extension,
        mime_type,
        file_type,
        size,
        local_uri
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        file.name,
        file.originalName,
        file.extension,
        file.mimeType,
        file.fileType,
        file.size,
        file.localUri,
      ],
    );
  },

  async list(): Promise<StorageFile[]> {
    const result = await db.getAllAsync<any>(`
      SELECT
        id,
        name,
        original_name as originalName,
        extension,
        mime_type as mimeType,
        file_type as fileType,
        size,
        local_uri as localUri,
        created_at as createdAt
      FROM storage_files
      ORDER BY id DESC
    `);

    return result as StorageFile[];
  },

  async delete(id: number) {
    await db.runAsync(
      `
      DELETE FROM storage_files
      WHERE id = ?
      `,
      [id],
    );
  },

  async clear() {
    await db.runAsync(`
      DELETE FROM storage_files
    `);
  },
};
