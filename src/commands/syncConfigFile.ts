import performCleanup from "src/helpers/performCleanup";
import addScreen from "src/commands/addScreen";
import { config } from "src/config";

export default async function syncConfigFile() {
  await performCleanup();

  config()?.screens.map((screen) => {
    addScreen(screen.name);
  });
}
