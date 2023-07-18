#! /usr/bin/env node

import { Command } from "commander";
import scaffold from "./commands/scaffold";
import addconfig from "./commands/addconfig";
import add from "./commands/add";
import remove from "./commands/remove";

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
  .command("addconfig")
  .description("Add config file for a resource by passing in the resource name")
  .argument("<resourceName>", "Name of the resource you want to add config file for")
  .action(addconfig);

program
  .command("add")
  .argument("[resourceName]", "Name of the resource you want to add")
  .option("--all", "All resources present in the kitconfig will be added")
  .option("-f, --force", "Forcefully add the resource, overwriting existing files (if any).")
  .option("--only-webapp", "Only add the resource to webapp")
  .option("--only-server", "Only add the resource to server")
  .description("Adds new resources")
  .action(add);

program
  .command("remove")
  .argument("[resourceName]", "Name of the resource you want to remove")
  .option("--all", "All resources present in the kitconfig will be removed")
  .option("--only-webapp", "Only remove the resource from webapp")
  .option("--only-server", "Only remove the resource from server")
  .description("Removes existing resources")
  .action(remove);

program.parse();
