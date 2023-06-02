#! /usr/bin/env node

import { Command } from "commander";
import os from "os";
import sync from "./commands/sync";
import add from "./commands/add";
import remove from "./commands/remove";
import scaffold from "./commands/scaffold";
import addconfig from "./commands/addconfig";

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
  .command("add")
  .description("Add a new resource")
  .argument("resourceName", "Name of the resource")
  .action(add);

program
  .command("addconfig")
  .description("")
  .argument("resourceName", "Name of the resource you want to add config file for.")
  .action(addconfig);

program
  .command("remove")
  .description("Removes an existing resource")
  .argument("resourceName", "Name of the resource")
  .action(remove);

program.command("sync").description(`Add resources defined in "kitconfig" to the project`).action(sync);

program.parse();
