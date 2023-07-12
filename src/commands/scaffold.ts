import simpleGit from "simple-git";
import fs from "fs-extra";
import ora from "ora";
import performCleanupWebapp from "src/helpers/webapp/performCleanupWebapp";
import { getTemplateFolderPath, runInFolderAsync, runInFolderSync } from "src/helpers/folders";
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

  await simpleGit().clone("https://github.com/oaktreeapps/admin-panel", projectName);

  process.chdir(projectName);
  // await execAsync("git checkout dev");

  const templateFolderPath = getTemplateFolderPath();

  fs.ensureDirSync(`${templateFolderPath}`);
  fs.ensureDirSync(`${templateFolderPath}/webapp`);
  fs.ensureDirSync(`${templateFolderPath}/server`);

  fs.removeSync("./.git");

  runInFolderSync("webapp", () => {
    fs.copyFileSync(`./src/screens/XXXXX/XXXXX.tsx`, `${templateFolderPath}/webapp/XXXXX.tsx`);
    fs.copyFileSync(
      `./src/screens/XXXXX/CreateXXXXX.tsx`,
      `${templateFolderPath}/webapp/CreateXXXXX.tsx`,
    );
    fs.copyFileSync(
      `./src/screens/XXXXX/EditXXXXX.tsx`,
      `${templateFolderPath}/webapp/EditXXXXX.tsx`,
    );
    fs.copyFileSync(`./src/types/xxxxx.d.ts`, `${templateFolderPath}/webapp/xxxxx.d.ts`);
    fs.writeFileSync("./.env", `VITE_BASE_URL = "http://localhost:3005/api"`);
    performCleanupWebapp();
  });

  runInFolderSync("server", () => {
    fs.copyFileSync(
      `./src/Microservices/XXXXX/XXXXXRouter.ts`,
      `${templateFolderPath}/server/XXXXXRouter.ts`,
    );
    fs.copyFileSync(
      `./src/Microservices/XXXXX/XXXXXController.ts`,
      `${templateFolderPath}/server/XXXXXController.ts`,
    );
    fs.copyFileSync(
      `./src/Microservices/XXXXX/XXXXX.dto.ts`,
      `${templateFolderPath}/server/XXXXX.dto.ts`,
    );
    fs.copyFileSync(
      `./src/Database/Entities/XXXXXEntity.ts`,
      `${templateFolderPath}/server/XXXXXEntity.ts`,
    );

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
