import { router } from "expo-router";

import { PickerOption, usePickerStore } from "@/src/store/pickerStore";

interface Params<T = string | number> {
  title: string;
  value: T | null;
  options: PickerOption<T>[];
  onSelect: (value: T) => void;
}

export function openPicker<T extends string | number>({
  title,
  value,
  options,
  onSelect,
}: Params<T>) {
  usePickerStore.getState().openPicker({
    title,
    value,
    options,
    onSelect,
  });

  router.push("/picker");
}
