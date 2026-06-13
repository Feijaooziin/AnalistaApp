import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { usePickerStore } from "@/src/store/pickerStore";

export default function PickerScreen() {
  const { title } = usePickerStore();
  return (
    <ScreenContainer
      modal
      header={{
        title: `Selecionar ${String(title)}`,
      }}
    >
      <PageContext title={String(title)} />
    </ScreenContainer>
  );
}
