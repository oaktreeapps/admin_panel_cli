import fs from "fs-extra";
import { kitSchema } from "./schemas";
import { runInFolderSync } from "./helpers/folders";

export const config = () =>
  runInFolderSync("root", () => {
    const kitConfigExists = fs.existsSync("kit.config.json");

    if (!kitConfigExists) {
      return null;
    }

    const rawConfig = JSON.parse(fs.readFileSync("kit.config.json").toString());
    const config = kitSchema.parse(rawConfig);

    return config;
  });
