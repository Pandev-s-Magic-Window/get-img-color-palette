import type {Request} from "./request";
import {outputImagePalettesToStdout} from "./output-image-palettes-to-stdout";

export async function processFilePathRequest(request: Request) {
  const img_file = Bun.file(request.data);
  const arr_buffer = await img_file.arrayBuffer();
  const img_buffer = Buffer.from(arr_buffer);

  if (img_buffer == null) {
    throw new Error("Empty image buffer for file_path request");
  }

  await outputImagePalettesToStdout(img_buffer, request.request_id);
}
