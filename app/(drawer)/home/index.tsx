import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

export default function Home() {
  return (
    <ScreenContainer header={{ title: "Home", toggleTheme: true }}>
      <PageContext title="Home" />
    </ScreenContainer>
  );
}
