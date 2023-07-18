import fs from "fs-extra";
import chalk from "chalk";
import resolveNewScreenDependencies from "src/helpers/webapp/resolveNewScreenDependencies";
import { configAsync } from "src/config";
import { getActiveFolders, runInFolderAsync } from "src/helpers/folders";
import resolveNewCrudDependencies from "src/helpers/server/resolveNewCrudDependencies";
import ora from "ora";
import execAsync from "./exec";
import removeResource from "./removeResource";

const webappSpinner = ora({
  color: "blue",
  indent: 2,
});
const serverSpinner = ora({
  color: "blue",
  indent: 2,
});

export default async function addResource(
  screenNameArg: string,
  options?: { force?: boolean; places?: ("webapp" | "server")[] },
) {
  const activeFolders = getActiveFolders();

  const screenName = screenNameArg.toLowerCase();

  const screen = (await configAsync())?.resources?.find(
    (screen) => screen.name.toLowerCase() === screenName.toLowerCase(),
  );
  if (!screen) {
    webappSpinner.fail(`Resource ${chalk.cyan(screenName)} not found in config file`);
    return;
  }

  let places = options?.places;
  if (screen.only) {
    if (screen.only === "server") places = ["server"];
    if (screen.only === "webapp") places = ["webapp"];
  }

  const capitalizedScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);

  if (activeFolders.includes("webapp") && (!places || places.includes("webapp"))) {
    await runInFolderAsync("webapp", async () => {
      const folderPath = `./src/screens/${capitalizedScreenName}`;
      if (fs.existsSync(folderPath)) {
        if (!options?.force) {
          webappSpinner.fail(`Screen for ${chalk.cyan(capitalizedScreenName)} already exists`);
          return;
        }

        await removeResource(screenName, { places: ["webapp"] });
      }

      webappSpinner.start(`Creating screen: ${chalk.cyan(capitalizedScreenName)}`);

      const filePath = `${folderPath}/${capitalizedScreenName}.tsx`;
      const createFilePath = `${folderPath}/Create${capitalizedScreenName}.tsx`;
      const editFilePath = `${folderPath}/Edit${capitalizedScreenName}.tsx`;
      const typesFilePath = `./src/types/${capitalizedScreenName.toLowerCase()}.d.ts`;
      fs.createFileSync(filePath);
      fs.createFileSync(createFilePath);
      fs.createFileSync(editFilePath);
      fs.createFileSync(typesFilePath);

      await resolveNewScreenDependencies(capitalizedScreenName, screen);

      await execAsync(`yarn prettify`);

      webappSpinner.succeed(`Created screen: ${chalk.cyan(capitalizedScreenName)}`);
    });
  }

  if (activeFolders.includes("server") && (!places || places.includes("server"))) {
    await runInFolderAsync("server", async () => {
      const folderPath = `./src/Microservices/${capitalizedScreenName}`;
      if (fs.existsSync(folderPath)) {
        if (!options?.force) {
          serverSpinner.fail(`CRUD for ${chalk.cyan(capitalizedScreenName)} already exists`);
          return;
        }

        await removeResource(screenName, { places: ["server"] });
      }

      serverSpinner.start(`Creating CRUD for: ${chalk.cyan(capitalizedScreenName)}`);

      const controllerFilePath = `${folderPath}/${capitalizedScreenName}Controller.ts`;
      const routerFilePath = `${folderPath}/${capitalizedScreenName}Router.ts`;
      const dtoFilePath = `${folderPath}/${capitalizedScreenName}.dto.ts`;

      fs.createFileSync(controllerFilePath);
      fs.createFileSync(routerFilePath);
      fs.createFileSync(dtoFilePath);

      await resolveNewCrudDependencies(capitalizedScreenName, screen);

      await execAsync(`yarn prettify`);

      serverSpinner.succeed(`Created CRUD for: ${chalk.cyan(capitalizedScreenName)}`);
    });
  }
}
