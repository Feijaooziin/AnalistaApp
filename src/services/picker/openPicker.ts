import { router } from "expo-router";

import { PickerOption, usePickerStore } from "@/src/store/pickerStore";

interface Params {
  title: string;
  value: string | number | null;
  options: PickerOption[];
  onSelect: (value: string | number) => void;
}

export function openPicker({ title, value, options, onSelect }: Params) {
  usePickerStore.getState().openPicker({
    title,
    value,
    options,
    onSelect,
  });

  router.push("/picker");
}
