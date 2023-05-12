import fs from "fs-extra";
import { kitSchema } from "../schemas";

export const config = () => {
  if (!fs.existsSync("kit.config.json")) return null;

  const rawConfig = JSON.parse(fs.readFileSync("kit.config.json").toString());
  const config = kitSchema.parse(rawConfig);

  return config;
};
