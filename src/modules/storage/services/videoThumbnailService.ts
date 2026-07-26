import * as VideoThumbnails from "expo-video-thumbnails";

export async function generateVideoThumbnail(
  uri: string,
): Promise<string | undefined> {
  try {
    const result = await VideoThumbnails.getThumbnailAsync(uri, {
      time: 1000,
    });

    return result.uri;
  } catch {
    return undefined;
  }
}
