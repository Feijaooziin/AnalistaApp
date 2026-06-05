import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

export default function id() {
  return (
    <ScreenContainer header={{ title: "Funcionário", variant: "back" }}>
      <PageContext title="Id" />
    </ScreenContainer>
  );
}
