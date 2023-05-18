import performCleanupWebapp from "src/helpers/webapp/performCleanupWebapp";
import addScreen from "src/commands/addScreen";
import { config } from "src/config";

export default async function syncConfigFile() {
  await performCleanupWebapp();

  config()?.screens.map((screen) => {
    addScreen(screen.name);
  });
}
