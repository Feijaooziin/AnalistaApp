import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

export default function Ecla() {
  return (
    <ScreenContainer header={{ title: "Emergent Cold", toggleTheme: true }}>
      <PageContext title="ECLA" />
    </ScreenContainer>
  );
}
