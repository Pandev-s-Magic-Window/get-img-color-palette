import {imageUrlToBuffer} from "./img-url-to-buffer";
import {outputImagePalettesToStdout} from "./output-image-palettes-to-stdout";
import type {Request} from "./request";

export async function processUrlRequest(request: Request) {
  const img_buffer = await imageUrlToBuffer(request.data);
  if (img_buffer == null) {
    throw new Error("Empty image buffer for URL request");
  }

  await outputImagePalettesToStdout(img_buffer, request.request_id);
}
