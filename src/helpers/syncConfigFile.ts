import performCleanup from "./performCleanup";
import createScreen from "./createScreen";
import { config } from "./config";

export default async function syncConfigFile() {
  await performCleanup();

  if (config)
    config.screens.map((screen) => {
      createScreen(screen.name);
    });
}
