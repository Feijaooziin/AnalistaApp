import { User } from "@/src/types/user";
import { db } from "../db";

export const usersJbsRepository = {
  async list() {
    return await db.getAllAsync<User>(
      `
      SELECT *
      FROM usersJbs
      ORDER BY nome ASC
      `,
    );
  },

  async findById(id: number) {
    return await db.getFirstAsync<User>(
      `
      SELECT *
      FROM usersJbs
      WHERE id = ?
      `,
      [id],
    );
  },

  async create(user: User) {
    await db.runAsync(
      `
      INSERT INTO usersJbs (
        nome,
        matricula,
        cargo,
        escala,
        endereco,
        email,
        telefone,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user.nome,
        user.matricula ?? null,
        user.cargo ?? null,
        user.escala ?? null,
        user.endereco ?? null,
        user.email ?? null,
        user.telefone ?? null,
        new Date().toISOString(),
      ],
    );
  },

  async update(user: User) {
    await db.runAsync(
      `
      UPDATE usersJbs
      SET
        nome = ?,
        matricula = ?,
        cargo = ?,
        escala = ?,
        endereco = ?,
        email = ?,
        telefone = ?
      WHERE id = ?
      `,
      [
        user.nome,
        user.matricula ?? null,
        user.cargo ?? null,
        user.escala ?? null,
        user.endereco ?? null,
        user.email ?? null,
        user.telefone ?? null,
        user.id,
      ],
    );
  },

  async remove(id: number) {
    await db.runAsync(
      `
      DELETE FROM usersJbs
      WHERE id = ?
      `,
      [id],
    );
  },
};
