import fs from "fs-extra";
import ora from "ora";
import { getActiveFolderState, runInFolderAsync } from "src/helpers/folders";

const spinner = ora({
  color: "blue",
  indent: 2,
});

export default async function removeResource(screenName: string) {
  const activeFolderState = getActiveFolderState();

  const capitalizedScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);

  if (activeFolderState === "both" || activeFolderState === "webapp") {
    await runInFolderAsync("webapp", async () => {
      const typeFilePath = `./src/types/${screenName}.d.ts`;
      const screensFolderPath = `./src/screens/${capitalizedScreenName}`;
      const menuItemsFilePath = `./src/layout/items.json`;

      if (!fs.existsSync(screensFolderPath)) {
        console.log(`  Nothing to remove in webapp.`);
        return;
      }

      spinner.start(`Removing screen: ${screenName}`);

      const menuItemsFile = fs.readFileSync(menuItemsFilePath);
      const menuItems = JSON.parse(menuItemsFile.toString());
      menuItems[0].items = menuItems[0].items.filter(
        (item: any) => item.label.toLowerCase() !== capitalizedScreenName.toLowerCase()
      );
      fs.writeFileSync(menuItemsFilePath, JSON.stringify(menuItems, null, 2));

      fs.removeSync(typeFilePath);
      fs.removeSync(screensFolderPath);

      const unwantedLines = [
        `<Route path="${capitalizedScreenName.toLowerCase()}" element={<${capitalizedScreenName}Page />} />`,
        `<Route path="${capitalizedScreenName.toLowerCase()}/create" element={<Create${capitalizedScreenName}Page />} />`,
        `<Route path="${capitalizedScreenName.toLowerCase()}/edit/:id" element={<Edit${capitalizedScreenName}Page />} />`,
        `import ${capitalizedScreenName}Page from "./screens/${capitalizedScreenName}/${capitalizedScreenName}"`,
        `import Edit${capitalizedScreenName}Page from "./screens/${capitalizedScreenName}/Edit${capitalizedScreenName}"`,
        `import Create${capitalizedScreenName}Page from "./screens/${capitalizedScreenName}/Create${capitalizedScreenName}"`,
      ];

      const mainTsx = fs.readFileSync("./src/main.tsx").toString().split("\n");
      const filteredLines = mainTsx.filter(
        (line) => unwantedLines.filter((unwantedLine) => line.includes(unwantedLine)).length === 0
      );
      fs.writeFileSync("./src/main.tsx", filteredLines.join("\n"));

      spinner.succeed(`Removed screen: ${screenName}`);
    });
  }

  if (activeFolderState === "both" || activeFolderState === "server") {
    await runInFolderAsync("server", async () => {
      const microserviceFolderPath = `./src/Microservices/${capitalizedScreenName}`;
      const entityFilePath = `./src/Database/Entities/${capitalizedScreenName}Entity.ts`;

      const collectionNamesFilePath = `./src/Database/CollectionNames.ts`;
      const apiRouterFilePath = `./src/Microservices/ApiRouter.ts`;

      if (!fs.existsSync(microserviceFolderPath)) {
        console.log(`  Nothing to remove in server.`);
        return;
      }

      spinner.start(`Removing CRUD: ${capitalizedScreenName}`);

      fs.removeSync(microserviceFolderPath);
      fs.removeSync(entityFilePath);

      const collectionNamesFileContent = fs
        .readFileSync(collectionNamesFilePath)
        .toString()
        .split("\n")
        .filter((line) => !line.includes(`${capitalizedScreenName}Collection`))
        .join("\n");

      const apiRouterFileContent = fs
        .readFileSync(apiRouterFilePath)
        .toString()
        .split("\n")
        .filter((line) => !line.includes(`${capitalizedScreenName}Router`))
        .join("\n");

      fs.writeFileSync(collectionNamesFilePath, collectionNamesFileContent);
      fs.writeFileSync(apiRouterFilePath, apiRouterFileContent);

      spinner.succeed(`Removed CRUD: ${capitalizedScreenName}`);
    });
  }
}
