export type TipoDocumento = "ADVERTENCIA" | "SUSPENSAO";

export interface AdvertenciaData {
  funcionario: string;
  admissao?: Date | null;
  numeroAdvertencia: 1 | 2 | 3;
  tipoDocumento: TipoDocumento;
  motivos: string[];
  observacoes?: string;
  dataOcorrido?: Date | null;
  dataAssinatura?: Date | null;
  cidade?: string;
}
