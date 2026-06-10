import { User } from "@/src/types/user";

export interface BackupData {
  exportedAt: string;

  usersJbs: User[];
}
