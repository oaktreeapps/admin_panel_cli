import fs from "fs-extra";
import { KitConfig, kitSchema } from "./schemas";
import { runInFolderSync } from "./helpers/folders";

export const config: () => KitConfig | null = () =>
  runInFolderSync("root", () => {
    const config: KitConfig = {
      backendUrl: "",
      screens: [],
    };

    if (!fs.existsSync("kitconfig") || !fs.existsSync("kitconfig/index.json")) {
      return null;
    }

    const kitConfigIndex = fs.readJSONSync("kitconfig/index.json");
    config.backendUrl = kitConfigIndex.backendUrl;

    const screenFiles = fs.readdirSync("kitconfig/screens");
    screenFiles.map((screenFile) => {
      const screen = fs.readJSONSync(`kitconfig/screens/${screenFile}`);
      config.screens.push(screen);
    });

    const parsedConfig = kitSchema.safeParse(config);

    if (!parsedConfig.success) {
      console.error("Config parsing error", parsedConfig.error);
      return null;
    }

    return parsedConfig.data;
  });
