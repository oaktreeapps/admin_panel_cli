#! /usr/bin/env node

import { Command } from "commander";
import os from "os";
import syncConfigFile from "./commands/syncConfigFile";
import addScreen from "./commands/addScreen";
import removeScreen from "./commands/removeScreen";
import scaffold from "./commands/scaffold";

export const adminKitPath = os.homedir() + "/.adminkit";

const program = new Command();

program.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");

program
  .command("scaffold")
  .option("--only-webapp", "Only scaffold the webapp")
  .option("--only-server", "Only scaffold the server")
  .description("Scaffold a new admin project by using templates")
  .argument("<projectName>", "Name of the project")
  .action(scaffold);

program
  .command("addscreen")
  .description("Add a new screen")
  .argument("<screenName>", "Name of the screen")
  .action(addScreen);

program
  .command("removescreen")
  .description("Removes an existing screen")
  .argument("<screenName>", "Name of the screen")
  .action(removeScreen);

program
  .command("sync")
  .description(`Add screens defined in "kitconfig" to the project`)
  .action(syncConfigFile);

program.parse();
