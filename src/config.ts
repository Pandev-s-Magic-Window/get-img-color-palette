import * as path from "node:path";
import * as os from "node:os";

export class Config {
  static getAppDataDir() {
    const homedir = os.homedir();
    return path.join(homedir, 'AppData', 'Roaming', 'app.pandev.mw.get-img-color-palette')
  }
}
