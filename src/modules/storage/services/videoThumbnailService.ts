import * as VideoThumbnails from "expo-video-thumbnails";

export async function generateVideoThumbnail(uri: string) {
  try {
    const result = await VideoThumbnails.getThumbnailAsync(uri, {
      time: 1000,
    });

    return result.uri;
  } catch (error) {
    console.log("Erro ao gerar thumb:", error);

    return null;
  }
}
