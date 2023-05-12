#! /usr/bin/env node

import { Command } from "commander";
import ora from "ora";
import simpleGit from "simple-git";
import performCleanup from "./helpers/performCleanup";
import syncConfigFile from "./helpers/syncConfigFile";
import createScreen from "./helpers/createScreen";
import removeScreen from "./helpers/removeScreen";
import fs from "fs-extra";
import chalk from "chalk";
import { config } from "./helpers/config";

export const spinner = ora({
  color: "blue",
  indent: 2,
});

const setupProject = async (projectName: string) => {
  spinner.start("Cloning template");
  await simpleGit().clone("https://github.com/kuvamdazeus/admin-starter-react", "./" + projectName);
  spinner.succeed("Cloned template successfully");

  process.chdir(projectName);
  fs.ensureDirSync("./.adminkit");
  fs.copyFileSync("./src/screens/XXXXX/XXXXX.tsx", "./.adminkit/XXXXX.tsx");
  fs.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx", "./.adminkit/CreateXXXXX.tsx");
  fs.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx", "./.adminkit/EditXXXXX.tsx");
  fs.copyFileSync("./src/service/XXXXXService.ts", "./.adminkit/XXXXXService.ts");
  fs.copyFileSync("./src/types/xxxxx.d.ts", "./.adminkit/xxxxx.d.ts");
  fs.writeFileSync("./.env", `VITE_BASE_URL = "${config()?.backendUrl}"`);

  performCleanup();

  console.log(`\nRun the following commands to get started:\ncd ${chalk.green(projectName)}\nnpm install\n`);
};

const program = new Command();

program.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");

program
  .command("scaffold")
  .description("Scaffold a new admin UI project by using template")
  .argument("<projectName>", "Name of the project")
  .action(setupProject);

program
  .command("addscreen")
  .description("Create a new screen")
  .argument("<screenName>", "Name of the screen")
  .action(createScreen);

program
  .command("removescreen")
  .description("Removes an existing screen")
  .argument("<screenName>", "Name of the screen")
  .action(removeScreen);

program
  .command("sync")
  .description(`Add screens defined in "kit.config.json" to the project`)
  .action(syncConfigFile);

program.parse();
