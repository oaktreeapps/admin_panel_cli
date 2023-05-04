import fs from "fs-extra";

export default async function performCleanup() {
  const unwantedLines = [
    // imports
    `import XXXXXPage from "./screens/XXXXX/XXXXX"`,
    `import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"`,
    `import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"`,

    // routes
    `<Route path="xxxxx" element={<XXXXXPage />} />`,
    `<Route path="xxxxx/create" element={<CreateXXXXXPage />} />`,
    `<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />`,
  ];

  fs.removeSync("./.git");
  fs.removeSync("./src/service/XXXXXService.ts");
  fs.removeSync("./src/screens/XXXXX");
  fs.removeSync("./src/types/xxxxx.d.ts");

  const mainTsx = fs.readFileSync("./src/main.tsx").toString();
  const mainTsxLines = mainTsx.split("\n");

  const filteredLines = mainTsxLines.filter(
    (line) => unwantedLines.filter((unwantedLine) => line.includes(unwantedLine)).length === 0
  );

  fs.writeFileSync("./src/main.tsx", filteredLines.join("\n"));
}
