import package_json from '../package.json';
import {program} from '@commander-js/extra-typings';
import {assert} from "typia";

import {imageUrlToBuffer} from "./img-url-to-buffer";
import {outputImagePalettesToStdout} from "./output-image-palettes-to-stdout";
import {createNodeLogger} from "./create-node-logger";

const logger = createNodeLogger();

program
  .name('mw-color-palette')
  .version(package_json.version)
  .description(
    'Takes in images as array buffers via stdin and returns their given color palettes. ' +
    'Returns a quantized palette and a "vibrant" palette (also known as semantic swatches) for each image.'
  )
  .action(async () => {
    for await (const line of console) {
      if (line == null || line === '') {
        process.stdout.write(JSON.stringify({
          status: 'error',
          message: "Empty input",
        }) + '\r\n');
        continue;
      }

      let parsed_line;
      try {
        parsed_line = JSON.parse(line);
      } catch (e) {
        logger.error(e);
        process.stdout.write(JSON.stringify({
          status: 'error',
          message: "Could not parse line into JSON",
        }) + '\r\n');
        continue;
      }

      try {
        const json_msg = assert<{ request_id?: string, image_url: string }>(parsed_line);
        const img_buffer = await imageUrlToBuffer(json_msg.image_url);
        if (img_buffer != null) {
          outputImagePalettesToStdout(img_buffer, json_msg.request_id);
        }
      } catch (e: any) {
        logger.error(e);
        process.stdout.write(JSON.stringify({
          status: 'error',
          message: e.message != null ? e.message : e,
        }) + '\r\n');
      }
    }
  });

program.parse();
