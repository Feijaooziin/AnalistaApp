import * as Print from "expo-print";
import * as FileSystem from "expo-file-system/legacy";

import { AdvertenciaData } from "../types/advertencia";
import { gerarHtmlAdvertencia } from "./templateAdvertencia";
import { logoBase64 } from "../data/logoBase64";

function normalizarTexto(texto: string) {
  return texto
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function gerarNomeArquivo(data: AdvertenciaData) {
  const documento =
    data.tipoDocumento === "ADVERTENCIA" ? "Advertencia" : "Suspensao";

  const funcionario = normalizarTexto(data.funcionario);
  const motivo = data.motivos[0] ?? "SemMotivo";
  const motivoFormatado = motivo.replace(/[^\w\s]/g, "").replace(/\s+/g, "_");
  return `${data.numeroAdvertencia}ª ${documento} ${funcionario} ${motivoFormatado}.pdf`;
}

export async function gerarPDF(data: AdvertenciaData) {
  const html = gerarHtmlAdvertencia(
    data,
    `data:image/png;base64,${logoBase64}`,
  );

  const { uri } = await Print.printToFileAsync({
    html,
  });

  const nomeArquivo = gerarNomeArquivo(data);
  const filePath = FileSystem.documentDirectory + nomeArquivo;

  await FileSystem.moveAsync({
    from: uri,
    to: filePath,
  });

  return filePath;
}
