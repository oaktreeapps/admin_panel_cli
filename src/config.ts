import fs from "fs-extra";
import { kitSchema } from "./schemas";

export const config = () => {
  let kitConfigPath: string | null = null;

  if (fs.existsSync("kit.config.json")) {
    kitConfigPath = "kit.config.json";
  } else if (fs.existsSync("../kit.config.json")) {
    kitConfigPath = "../kit.config.json";
  }

  if (!kitConfigPath) return null;

  const rawConfig = JSON.parse(fs.readFileSync(kitConfigPath).toString());
  const config = kitSchema.parse(rawConfig);

  return config;
};
