import { db } from "./db";

export async function initDB() {
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
