export type FileType = "pdf" | "image" | "video" | "excel" | "word" | "other";

export function getFileType(mimeType: string, fileName: string): FileType {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (mimeType.includes("pdf") || ext === "pdf") return "pdf";

  if (mimeType.startsWith("image/")) return "image";

  if (mimeType.startsWith("video/")) return "video";

  if (mimeType.includes("spreadsheet") || ext === "xlsx" || ext === "xls")
    return "excel";

  if (mimeType.includes("word") || ext === "docx" || ext === "doc")
    return "word";

  return "other";
}
