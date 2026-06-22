import AppIcon from "@/src/components/icons/AppIcon";

interface Props {
  type: string;
  color: string;
  size?: number;
}

export default function FileIcon({ type, color, size = 28 }: Props) {
  const iconMap: Record<string, any> = {
    pdf: "document-text",
    image: "image",
    video: "videocam",
    excel: "grid",
    word: "document",
    other: "document-outline",
  };

  return (
    <AppIcon
      name={iconMap[type] ?? "document-outline"}
      size={size}
      color={color}
    />
  );
}
