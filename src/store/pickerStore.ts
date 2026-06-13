import { create } from "zustand";

export interface PickerOption<T = string> {
  label: string;
  value: T;
}

interface OpenPickerParams<T = string | number> {
  title: string;
  value: T | null;
  options: PickerOption<T>[];
  onSelect: (value: T) => void;
}

interface PickerStore {
  title: string;
  value: string | number | null;
  options: PickerOption[];
  onSelect?: (value: any) => void;
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
