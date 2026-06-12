import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

export default function Seara() {
  return (
    <ScreenContainer header={{ title: "Seara", toggleTheme: true }}>
      <PageContext title="Seara" />
    </ScreenContainer>
  );
}
