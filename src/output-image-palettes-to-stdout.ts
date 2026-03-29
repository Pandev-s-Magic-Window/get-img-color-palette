import {getPalette, getSwatches} from "colorthief";

export async function outputImagePalettesToStdout(img_array_buffer: Buffer<ArrayBuffer>, request_id?: string) {
  const quantized_palette = await getPalette(img_array_buffer);
  const vibrant_palette = await getSwatches(img_array_buffer);

  process.stdout.write(JSON.stringify({
    request_id,
    palettes: {
      quantized: quantized_palette?.map((quantized) => quantized.hex()),
      vibrant: {
        vibrant: vibrant_palette.Vibrant?.color.hex(),
        dark_vibrant: vibrant_palette.DarkVibrant?.color.hex(),
        light_vibrant: vibrant_palette.LightVibrant?.color.hex(),
        muted: vibrant_palette.Muted?.color.hex(),
        dark_muted: vibrant_palette.DarkMuted?.color.hex(),
        light_muted: vibrant_palette.LightMuted?.color.hex()
      }
    }
  }) + '\r\n');
}
