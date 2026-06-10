import { useEffect } from "react";

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

export function triggerRefresh(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

export function useRefresh(key: string, callback: () => void) {
  useEffect(() => {
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }

    const listener = () => callback();

    listeners.get(key)?.add(listener);

    return () => {
      listeners.get(key)?.delete(listener);
    };
  }, [key, callback]);
}
