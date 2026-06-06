export type User = {
  id?: number;
  nome: string;
  matricula?: string;
  cargo?: string;
  escala?: string;
  endereco?: string;
  email?: string;
  telefone?: string;
  created_at?: string;
};

export type CreateUserDTO = {
  nome: string;
  matricula?: string | null;
  cargo?: string | null;
  escala?: string | null;
  endereco?: string | null;
  email?: string | null;
  telefone?: string | null;
};
