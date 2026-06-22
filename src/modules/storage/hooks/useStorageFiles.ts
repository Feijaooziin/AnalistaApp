import { useCallback, useEffect, useState } from "react";
import { storageRepository } from "../repositories/storageRepository";

export function useStorageFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    const data = await storageRepository.list();
    setFiles(data);
    setLoading(false);
  }, []);

  const removeFile = useCallback(
    async (id: number) => {
      await storageRepository.delete(id);
      await loadFiles();
    },
    [loadFiles],
  );

  const clearAll = useCallback(async () => {
    await storageRepository.clear();
    await loadFiles();
  }, [loadFiles]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  return {
    files,
    loading,
    loadFiles,
    removeFile,
    clearAll,
  };
}
