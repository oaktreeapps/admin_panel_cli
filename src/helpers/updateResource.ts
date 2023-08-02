import fs from "fs-extra";
import { runInFolderAsync } from "./folders";
import type { KitConfigScreen } from "src/schemas";
import addResource from "./addResource";
import removeResource from "./removeResource";
import { getConfigFile } from "src/templateStrings/server/config";

const updateResource = (name: string, resource: KitConfigScreen) =>
  runInFolderAsync("root", async () => {
    const configFilePath = `./kitconfig/resources/${name.toLowerCase()}.cjs`;

    fs.writeFileSync(configFilePath, getConfigFile(resource.name.toLowerCase(), resource));

    await removeResource(resource.name.toLowerCase());
    await addResource(resource.name.toLowerCase());
  });

export default updateResource;
