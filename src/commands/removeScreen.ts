import { spinner } from "src/index";
import fs from "fs-extra";

export default function removeScreen(screenName: string) {
  const capitalizedScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);
  spinner.start(`Removing screen: ${screenName}`);

  const typeFilePath = `./src/types/${screenName}.d.ts`;
  const serviceFilePath = `./src/service/${capitalizedScreenName}Service.ts`;
  const screensFolderPath = `./src/screens/${capitalizedScreenName}`;
  const menuItemsFilePath = `./src/layout/items.json`;

  const menuItemsFile = fs.readFileSync(menuItemsFilePath);
  const menuItems = JSON.parse(menuItemsFile.toString());
  menuItems[0].items = menuItems[0].items.filter(
    (item: any) => item.label.toLowerCase() !== capitalizedScreenName.toLowerCase()
  );
  fs.writeFileSync(menuItemsFilePath, JSON.stringify(menuItems, null, 2));

  fs.removeSync(typeFilePath);
  fs.removeSync(serviceFilePath);
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
}
