import fs from "fs-extra";
import path from "path";
import { KitConfig, kitSchema, kitScreenSchema } from "./schemas";
import { runInFolderAsync } from "./helpers/folders";

export const configAsync: () => Promise<KitConfig | null> = async () =>
  runInFolderAsync("root", async () => {
    const config: KitConfig = {
      resources: [],
    };

    if (!fs.existsSync("kitconfig")) {
      console.log(`Can't detect the current directory as a valid admin project!`);
      return null;
    }

    const kitConfigAbsolutePath = path.join(process.cwd(), "kitconfig");

    const screenFiles = fs.readdirSync("kitconfig/resources");
    await Promise.all(
      screenFiles.map(async (screenFile) => {
        const configFileStr = fs
          .readFileSync(`${kitConfigAbsolutePath}/resources/${screenFile}`)
          .toString();

        const configFile = eval(configFileStr);

        const parsedScreen = kitScreenSchema.safeParse(configFile);

        if (parsedScreen.success) {
          config.resources.push(parsedScreen.data);
        } else {
          console.log(`Couldn't parse screen '${screenFile}':`, parsedScreen.error.format());
        }
      }),
    );

    const parsedConfig = kitSchema.safeParse(config);

    if (!parsedConfig.success) {
      console.error("Config parsing error", parsedConfig.error);
      return null;
    }

    return parsedConfig.data;
  });
