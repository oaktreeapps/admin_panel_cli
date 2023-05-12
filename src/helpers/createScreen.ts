import fs from "fs-extra";
import chalk from "chalk";
import { spinner } from "../index";
import resolveNewScreenDependencies from "./resolveNewScreenDependencies";
import { config } from "./config";

export default async function createScreen(screenName: string) {
  const screen = config()?.screens?.find((screen) => screen.name.toLowerCase() === screenName.toLowerCase());
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
  fs.createFileSync(filePath);
  fs.createFileSync(createFilePath);
  fs.createFileSync(editFilePath);

  await resolveNewScreenDependencies(capitalizedScreenName, screen);

  spinner.succeed(`Created screen: ${chalk.cyan(capitalizedScreenName)}`);
}
