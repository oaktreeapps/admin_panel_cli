import simpleGit from "simple-git";
import fs from "fs-extra";
import fetch from "node-fetch";
import ora from "ora";
import { adminKitPath } from "src/index";
import performCleanupWebapp from "src/helpers/webapp/performCleanupWebapp";
import { config } from "src/config";
import { runInFolderAsync, runInFolderSync } from "src/helpers/folders";
import performCleanupServer from "src/helpers/server/performCleanupServer";
import execAsync from "src/helpers/exec";

const spinner = ora({
  color: "blue",
  indent: 2,
});

export default async function scaffold(argProjectName: string) {
  const projectName = argProjectName.toLowerCase();

  spinner.start("Scaffolding project...");

  const [, nodeStarterKitEnv] = await Promise.all([
    simpleGit().clone("https://github.com/kuvamdazeus/adminkit-template", projectName),
    fetch(
      "https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt"
    ).then((res) => res.text()),
  ]);

  console.log(process.cwd());
  process.chdir(projectName);
  console.log(process.cwd());

  fs.ensureDirSync(`${adminKitPath}`);
  fs.ensureDirSync(`${adminKitPath}/webapp`);
  fs.ensureDirSync(`${adminKitPath}/server`);

  fs.removeSync("./.git");

  runInFolderSync("webapp", () => {
    fs.copyFileSync(`./src/screens/XXXXX/XXXXX.tsx`, `${adminKitPath}/webapp/XXXXX.tsx`);
    fs.copyFileSync(`./src/screens/XXXXX/CreateXXXXX.tsx`, `${adminKitPath}/webapp/CreateXXXXX.tsx`);
    fs.copyFileSync(`./src/screens/XXXXX/EditXXXXX.tsx`, `${adminKitPath}/webapp/EditXXXXX.tsx`);
    fs.copyFileSync(`./src/types/xxxxx.d.ts`, `${adminKitPath}/webapp/xxxxx.d.ts`);
    fs.writeFileSync("./.env", `VITE_BASE_URL = "${config()?.backendUrl}"`);
    performCleanupWebapp();
  });

  runInFolderSync("server", () => {
    fs.copyFileSync(`./src/Microservices/XXXXX/XXXXXRouter.ts`, `${adminKitPath}/server/XXXXXRouter.ts`);
    fs.copyFileSync(
      `./src/Microservices/XXXXX/XXXXXController.ts`,
      `${adminKitPath}/server/XXXXXController.ts`
    );
    fs.copyFileSync(`./src/Microservices/XXXXX/XXXXX.dto.ts`, `${adminKitPath}/server/XXXXX.dto.ts`);
    fs.copyFileSync(`./src/Database/Entities/XXXXXEntity.ts`, `${adminKitPath}/server/XXXXXEntity.ts`);

    fs.writeFileSync("./.env", nodeStarterKitEnv);
    performCleanupServer();
  });

  spinner.succeed(`Created "${projectName}" successfully!`);

  spinner.start("Installing dependencies...");

  await runInFolderAsync("webapp", async () => {
    await execAsync("yarn install");
  });

  await runInFolderAsync("server", async () => {
    await execAsync("yarn install");
  });

  spinner.succeed(`Installed dependencies successfully!`);
}
