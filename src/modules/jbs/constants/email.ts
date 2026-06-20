export const EMAIL_TO = "leonardo.santos@emergentcold.com";

export const EMAIL_SUBJECT = "Criar Emails Operacionais";

export const EMAIL_OPTIONS = [
  "Cortes",
  "Madero",
  "Paletes",
  "Produtividade",
  "Cargas Paradas",
  "Processos Noturnos",
  "Fiboi CRT",
  "Outbound",
];

export interface SavedEmail {
  name: string;
  email: string;
}

export const SAVED_EMAILS: SavedEmail[] = [
  {
    name: "Iverson",
    email: "iverson.avelar@empresa.com",
  },
  {
    name: "Suporte TI",
    email: "suporte@empresa.com",
  },
  {
    name: "Financeiro",
    email: "financeiro@empresa.com",
  },
];
