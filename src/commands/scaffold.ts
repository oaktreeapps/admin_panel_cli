import simpleGit from "simple-git";
import fs from "fs-extra";
import ora from "ora";
import { adminKitPath } from "src/index";
import performCleanupWebapp from "src/helpers/webapp/performCleanupWebapp";
import { runInFolderAsync, runInFolderSync } from "src/helpers/folders";
import performCleanupServer from "src/helpers/server/performCleanupServer";
import execAsync from "src/helpers/exec";
import { getServerEnvFile } from "src/templateStrings/server/env";

const spinner = ora({
  color: "blue",
  indent: 2,
});

interface Opts {
  onlyWebapp?: boolean;
  onlyServer?: boolean;
}

export default async function scaffold(argProjectName: string, opts: Opts) {
  const projectName = argProjectName.toLowerCase();

  spinner.start("Scaffolding project...");

  await simpleGit().clone("https://github.com/kuvamdazeus/adminkit-template", projectName);

  process.chdir(projectName);

  fs.ensureDirSync(`${adminKitPath}`);
  fs.ensureDirSync(`${adminKitPath}/webapp`);
  fs.ensureDirSync(`${adminKitPath}/server`);

  fs.removeSync("./.git");

  runInFolderSync("webapp", () => {
    fs.copyFileSync(`./src/screens/XXXXX/XXXXX.tsx`, `${adminKitPath}/webapp/XXXXX.tsx`);
    fs.copyFileSync(`./src/screens/XXXXX/CreateXXXXX.tsx`, `${adminKitPath}/webapp/CreateXXXXX.tsx`);
    fs.copyFileSync(`./src/screens/XXXXX/EditXXXXX.tsx`, `${adminKitPath}/webapp/EditXXXXX.tsx`);
    fs.copyFileSync(`./src/types/xxxxx.d.ts`, `${adminKitPath}/webapp/xxxxx.d.ts`);
    fs.writeFileSync("./.env", `VITE_BASE_URL = "http://localhost:3005/api"`);
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

    fs.writeFileSync("./.env", getServerEnvFile());
    performCleanupServer();
  });

  spinner.succeed(`Created "${projectName}" successfully!`);

  if (opts.onlyServer) fs.removeSync("webapp");
  if (opts.onlyWebapp) fs.removeSync("server");

  spinner.start("Installing dependencies...");

  if (!opts.onlyServer) {
    await runInFolderAsync("webapp", async () => {
      await execAsync("yarn install");
    });
  }

  if (!opts.onlyWebapp) {
    await runInFolderAsync("server", async () => {
      await execAsync("yarn install");
    });
  }

  spinner.succeed(`Installed dependencies successfully!`);
}
