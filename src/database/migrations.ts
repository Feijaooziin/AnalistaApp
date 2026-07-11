import { db } from "./db";

export async function createUserJbsTable() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usersJbs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      matricula TEXT,
      cargo TEXT,
      escala TEXT,
      endereco TEXT,
      email TEXT,
      telefone TEXT,
      created_at TEXT
    );
  `);
}

export async function createStorageTable() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS storage_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      original_name TEXT NOT NULL,
      extension TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      file_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      local_uri TEXT NOT NULL,
      thumbnail_uri TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function runMigrations() {
  await createUserJbsTable();
  await createStorageTable();
}
