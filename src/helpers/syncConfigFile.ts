import fs from "fs-extra";
import { kitSchema } from "src/schemas";
import performCleanup from "./performCleanup";
import createScreen from "./createScreen";

export default async function syncConfigFile() {
  const rawConfig = JSON.parse(fs.readFileSync("kit.config.json").toString());
  const config = kitSchema.parse(rawConfig);

  await performCleanup();

  config.screens.map((screen) => {
    createScreen(screen.name);
  });
}
