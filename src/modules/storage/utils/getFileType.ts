export function getFileType(mime: string, name: string) {
  const ext = name.split(".").pop()?.toLowerCase();

  if (mime.includes("pdf") || ext === "pdf") return "pdf";

  if (
    mime.includes("image") ||
    ["png", "jpg", "jpeg", "webp"].includes(ext || "")
  )
    return "image";

  if (mime.includes("video")) return "video";

  if (mime.includes("sheet") || ["xls", "xlsx", "csv"].includes(ext || ""))
    return "excel";

  if (mime.includes("word") || ["doc", "docx"].includes(ext || ""))
    return "word";

  return "other";
}
