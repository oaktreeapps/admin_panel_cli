import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import { runInFolderSync } from "src/helpers/folders";
import { getConfigFile } from "src/templateStrings/server/config";

const spinner = ora({
  color: "blue",
  indent: 2,
});

export default async function addconfig(screenNameArg: string) {
  const screenName = screenNameArg.toLowerCase();

  const configFile = getConfigFile(screenName);

  spinner.start(`Creating config template for ${chalk.cyan(screenName)}`);

  runInFolderSync("root", () => {
    const filePath = `kitconfig/resources/${screenName}.cjs`;
    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, configFile);
  });

  spinner.succeed(`Created config template for ${chalk.cyan(screenName)}`);
}
