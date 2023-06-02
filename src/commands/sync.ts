import add from "src/commands/add";
import { configAsync } from "src/config";

const addScreens = () => {
  return new Promise<void>(async (resolve, _) => {
    const screens = (await configAsync())?.resources;

    screens?.map(async (screen, index) => {
      await add(screen.name);

      if (screens.length === index + 1) {
        resolve();
      }
    });
  });
};

export default async function sync() {
  await addScreens();
}
