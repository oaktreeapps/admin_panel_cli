import fs from "fs-extra";
import chalk from "chalk";
import { spinner } from "../index";
import resolveNewScreenDependencies from "./resolveNewScreenDependencies";

export default async function createScreen(screenName: string) {
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
  fs.createFile(filePath);
  fs.createFile(createFilePath);
  fs.createFile(editFilePath);

  await resolveNewScreenDependencies(capitalizedScreenName);

  spinner.succeed(`Created screen: ${chalk.cyan(capitalizedScreenName)}`);
}
