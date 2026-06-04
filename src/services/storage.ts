import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  THEME: "@theme",
  SETTINGS: "@settings",
} as const;

export async function setItem<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem<T>(key: string): Promise<T | null> {
  const value = await AsyncStorage.getItem(key);

  if (!value) return null;

  return JSON.parse(value);
}

export async function removeItem(key: string) {
  await AsyncStorage.removeItem(key);
}
