import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

export default function Home() {
  return (
    <ScreenContainer header={{ title: "Home", variant: "menu" }}>
      <PageContext title="Home" />
    </ScreenContainer>
  );
}
