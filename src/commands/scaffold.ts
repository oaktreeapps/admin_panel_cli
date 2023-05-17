import simpleGit from "simple-git";
import fs from "fs-extra";
import { adminKitPath, spinner } from "src/index";
import performCleanup from "src/commands/performCleanup";
import chalk from "chalk";
import { config } from "src/config";

export default async function scaffold(projectName: string) {
  spinner.start("Cloning template");
  await simpleGit().clone("https://github.com/kuvamdazeus/admin-starter-react", "./" + projectName);
  spinner.succeed("Cloned template successfully");

  process.chdir(projectName);
  fs.ensureDirSync(`${adminKitPath}`);
  fs.copyFileSync(`./src/screens/XXXXX/XXXXX.tsx`, `${adminKitPath}/XXXXX.tsx`);
  fs.copyFileSync(`./src/screens/XXXXX/CreateXXXXX.tsx`, `${adminKitPath}/CreateXXXXX.tsx`);
  fs.copyFileSync(`./src/screens/XXXXX/EditXXXXX.tsx`, `${adminKitPath}/EditXXXXX.tsx`);
  fs.copyFileSync(`./src/service/XXXXXService.ts`, `${adminKitPath}/XXXXXService.ts`);
  fs.copyFileSync(`./src/types/xxxxx.d.ts`, `${adminKitPath}/xxxxx.d.ts`);
  fs.writeFileSync("./.env", `VITE_BASE_URL = "${config()?.backendUrl}"`);

  performCleanup();

  console.log(`\nRun the following commands to get started:\ncd ${chalk.green(projectName)}\nnpm install\n`);
}
