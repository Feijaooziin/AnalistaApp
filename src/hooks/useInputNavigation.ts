import { createRef } from "react";
import { TextInput } from "react-native";

export function useInputNavigation(quantity: number) {
  const refs = Array.from({ length: quantity }, () => createRef<TextInput>());

  function focusNext(index: number) {
    refs[index + 1]?.current?.focus();
  }

  return {
    refs,
    focusNext,
  };
}
