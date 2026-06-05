import { db } from "../db";

export const usersJbsRepository = {
  async list() {
    return await db.getAllAsync("SELECT * FROM usersJbs ORDER BY nome ASC");
  },

  async findById(id: number) {
    return await db.getFirstAsync("SELECT * FROM usersJbs WHERE id = ?", [id]);
  },

  async remove(id: number) {
    await db.runAsync("DELETE FROM usersJbs WHERE id = ?", [id]);
  },
};
