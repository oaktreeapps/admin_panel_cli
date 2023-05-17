import simpleGit from "simple-git";
import fs from "fs-extra";
import fetch from "node-fetch";
import { adminKitPath, spinner } from "src/index";
import performCleanup from "src/helpers/performCleanup";
import { config } from "src/config";

export default async function scaffold(projectName: string) {
  spinner.start("Cloning template");

  fs.ensureDirSync(projectName);
  process.chdir(projectName);

  const [, , kitConfigFile] = await Promise.all([
    simpleGit().clone("https://github.com/kuvamdazeus/admin-starter-react", "webapp"),
    simpleGit().clone("https://github.com/Milan619/node-starter-kit", "server"),
    fetch(
      "https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/f1b60f6fc25cb111424f824bc455358abbfacc38/kit.config.json"
    ).then((res) => res.text()),
  ]);

  fs.writeFileSync("./kit.config.json", kitConfigFile);

  fs.ensureDirSync(`${adminKitPath}`);
  fs.ensureDirSync(`${adminKitPath}/webapp`);
  fs.ensureDirSync(`${adminKitPath}/server`);

  process.chdir("webapp");
  fs.copyFileSync(`./src/screens/XXXXX/XXXXX.tsx`, `${adminKitPath}/webapp/XXXXX.tsx`);
  fs.copyFileSync(`./src/screens/XXXXX/CreateXXXXX.tsx`, `${adminKitPath}/webapp/CreateXXXXX.tsx`);
  fs.copyFileSync(`./src/screens/XXXXX/EditXXXXX.tsx`, `${adminKitPath}/webapp/EditXXXXX.tsx`);
  fs.copyFileSync(`./src/types/xxxxx.d.ts`, `${adminKitPath}/webapp/xxxxx.d.ts`);
  fs.writeFileSync("./.env", `VITE_BASE_URL = "${config()?.backendUrl}"`);
  performCleanup();
  process.chdir("..");

  spinner.succeed("Cloned template successfully");
}
