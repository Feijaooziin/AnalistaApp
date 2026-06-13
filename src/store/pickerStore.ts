import { create } from "zustand";

export interface PickerOption {
  label: string;
  value: string | number;
}

interface OpenPickerParams {
  title: string;
  value: string | number | null;
  options: PickerOption[];
  onSelect: (value: string | number) => void;
}

interface PickerStore {
  title: string;
  value: string | number | null;
  options: PickerOption[];
  onSelect?: (value: string | number) => void;
  openPicker: (params: OpenPickerParams) => void;
  closePicker: () => void;
}

export const usePickerStore = create<PickerStore>((set) => ({
  title: "",
  value: null,
  options: [],
  onSelect: undefined,
  openPicker: ({ title, value, options, onSelect }) =>
    set({
      title,
      value,
      options,
      onSelect,
    }),

  closePicker: () =>
    set({
      title: "",
      value: null,
      options: [],
      onSelect: undefined,
    }),
}));
