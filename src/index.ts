import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import simpleGit from "simple-git";
import fs from "fs-extra";
import { execAsync } from "./helpers/commands";
import { performCleanup, resolveNewScreenDependencies } from "./helpers/files";

export const spinner = ora({
  color: "blue",
  indent: 2,
});

const setupProject = async (projectName: string) => {
  spinner.start("Cloning template");
  await simpleGit().clone("https://github.com/kuvamdazeus/admin-starter-react", "./" + projectName);
  spinner.succeed("Cloned template successfully");

  process.chdir(projectName);

  spinner.start(`Installing dependencies`);
  await execAsync("yarn");
  spinner.succeed("Installed dependencies successfully");

  performCleanup();
};

const createScreen = async (screenName: string) => {
  const capitalizedScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);

  spinner.start(`Creating screen: ${chalk.cyan(capitalizedScreenName)}`);

  const folderPath = `./src/screens/${capitalizedScreenName}`;
  const filePath = `${folderPath}/${capitalizedScreenName}.tsx`;
  const createFilePath = `${folderPath}/Create${capitalizedScreenName}.tsx`;
  const editFilePath = `${folderPath}/Edit${capitalizedScreenName}.tsx`;
  fs.createFile(filePath);
  fs.createFile(createFilePath);
  fs.createFile(editFilePath);

  await resolveNewScreenDependencies(capitalizedScreenName);

  spinner.succeed(`Created screen: ${chalk.cyan(capitalizedScreenName)}`);
};

const program = new Command();

program.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");

program
  .command("scaffold")
  .description("Scaffold a new admin UI project by using template")
  .argument("<projectName>", "Name of the project")
  .action(setupProject);

program
  .command("screen")
  .description("Create a new screen")
  .argument("<screenName>", "Name of the screen")
  .action(createScreen);

program.parse();
