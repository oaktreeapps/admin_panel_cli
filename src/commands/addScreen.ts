import fs from "fs-extra";
import chalk from "chalk";
import { spinner } from "src/index";
import resolveNewScreenDependencies from "src/helpers/resolveNewScreenDependencies";
import { config } from "src/config";
import { runInFolder } from "src/helpers/folders";

export default async function addScreen(screenName: string) {
  await runInFolder("webapp", async () => {
    const screen = config()?.screens?.find(
      (screen) => screen.name.toLowerCase() === screenName.toLowerCase()
    );
    if (!screen) {
      spinner.fail(`Screen ${chalk.cyan(screenName)} not found in config file`);
      return;
    }

    const capitalizedScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);

    spinner.start(`Creating screen: ${chalk.cyan(capitalizedScreenName)}`);

    const folderPath = `./src/screens/${capitalizedScreenName}`;
    if (fs.existsSync(folderPath)) {
      spinner.fail(`Screen ${chalk.cyan(capitalizedScreenName)} already exists`);
      return;
    }

    const filePath = `${folderPath}/${capitalizedScreenName}.tsx`;
    const createFilePath = `${folderPath}/Create${capitalizedScreenName}.tsx`;
    const editFilePath = `${folderPath}/Edit${capitalizedScreenName}.tsx`;
    const typesFilePath = `./src/types/${capitalizedScreenName.toLowerCase()}.d.ts`;
    fs.createFileSync(filePath);
    fs.createFileSync(createFilePath);
    fs.createFileSync(editFilePath);
    fs.createFileSync(typesFilePath);

    await resolveNewScreenDependencies(capitalizedScreenName, screen);

    spinner.succeed(`Created screen: ${chalk.cyan(capitalizedScreenName)}`);
  });
}
