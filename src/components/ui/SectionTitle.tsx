import { Text } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: "700",

        color: colors.text,

        marginBottom: 12,
      }}
    >
      {title}
    </Text>
  );
}
