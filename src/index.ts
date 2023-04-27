import { Command } from "commander";
import ora from "ora";
import simpleGit from "simple-git";
import { execAsync } from "./helpers/commands";
import performCleanup from "./helpers/performCleanup";
import syncConfigFile from "./helpers/syncConfigFile";
import createScreen from "./helpers/createScreen";

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

program
  .command("sync")
  .description(`Add screens defined in "kit.config.json" to the project`)
  .action(syncConfigFile);

program.parse();
