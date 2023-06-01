import fs from "fs-extra";
import chalk from "chalk";
import { adminKitPath } from "src/index";
import {
  Dropdown,
  InputNumber,
  InputSwitch,
  InputText,
  InputTextarea,
  RadioButtonField,
} from "src/templateStrings/formFields";
import { TextColumn } from "src/templateStrings/mainFileColumns";
import { KitConfig } from "src/schemas";
import ora from "ora";

const spinner = ora({
  color: "blue",
  indent: 2,
});

const templatePlaceholders = {
  tableColumns: "{/*TABLE_COLUMNS*/}",
  initialState: "/*INITIAL_STATE_FIELDS*/",
  interface: "/*INTERFACE_FIELDS*/",
  input: "{/*INPUT_FIELDS*/}",
  validate: "/*VALIDATE_FIELDS*/",
};

export default async function resolveNewScreenDependencies(
  capitalizedScreenName: string,
  screen: KitConfig["screens"][number]
) {
  let interfaceFields = "";
  let initialStateFields = "";
  const requiredFields: string[] = [];
  const jsxFields: string[] = [];
  const tableColumns: string[] = [];
  const dropdownOptions: { fieldName: string; options: any[] }[] = [];

  const neverRequiredInputTypes = ["InputSwitch"];

  screen.crudFields.forEach((field, index) => {
    let interfacePropertyType = "";
    let initialValue = "";

    if (field.required && !neverRequiredInputTypes.includes(field.type)) requiredFields.push(field.name);

    if (field.type === "InputText" || field.type === "String") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputText(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (field.type === "InputTextarea") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputTextarea(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (field.type === "InputNumber" || field.type === "Number") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputNumber(field));
      interfacePropertyType = "number";
      initialValue = `0`;
    } else if (field.type === "Dropdown") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(Dropdown(field));
      dropdownOptions.push({ fieldName: field.name, options: field.options || [] });
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (field.type === "RadioButton") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(RadioButtonField(field, field.options || []));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (field.type === "InputSwitch" || field.type === "Boolean") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputSwitch(field));
      interfacePropertyType = "boolean";
      initialValue = `false`;
    }

    if (index === 0) {
      interfaceFields += `id?: string;\n`;
      initialStateFields += `id: undefined,\n`;
    }

    interfaceFields += `${field.name}: ${interfacePropertyType};\n`;
    initialStateFields += `${field.name}: ${initialValue},\n`;
  });

  const folderPath = `./src/screens/${capitalizedScreenName}`;
  const mainFilePath = `${folderPath}/${capitalizedScreenName}.tsx`;
  const createFilePath = `${folderPath}/Create${capitalizedScreenName}.tsx`;
  const editFilePath = `${folderPath}/Edit${capitalizedScreenName}.tsx`;
  const appMenuItemsFilePath = `./src/layout/items.json`;

  const mainScreenTemplateFile = fs.readFileSync(`${adminKitPath}/webapp/XXXXX.tsx`).toString();
  const createScreenTemplateFile = fs.readFileSync(`${adminKitPath}/webapp/CreateXXXXX.tsx`).toString();
  const editScreenTemplateFile = fs.readFileSync(`${adminKitPath}/webapp/EditXXXXX.tsx`).toString();
  const typesTemplateFile = fs.readFileSync(`${adminKitPath}/webapp/xxxxx.d.ts`).toString();

  const parsedMainScreenTemplateFile = mainScreenTemplateFile
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.initialState, initialStateFields);

  let mainScreenTemplateFileLines: string[] = [];
  parsedMainScreenTemplateFile.split("\n").forEach((line) => {
    if (line.includes(templatePlaceholders.tableColumns)) {
      mainScreenTemplateFileLines.push(...tableColumns);
      mainScreenTemplateFileLines.push(line);
    } else {
      mainScreenTemplateFileLines.push(line);
    }
  });

  fs.writeFileSync(mainFilePath, mainScreenTemplateFileLines.join("\n"));

  const parsedCreateScreenTemplateFile = createScreenTemplateFile
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.input, jsxFields.join("\n"))
    .replace(
      templatePlaceholders.validate,
      `if (${requiredFields.map((name) => `entity.${name}`).join(" && ")}) `
    );

  const createScreenTemplateFileLines: string[] = [];
  parsedCreateScreenTemplateFile.split("\n").forEach((line) => {
    if (line.includes("const saveEntity = async () => {")) {
      dropdownOptions.forEach(({ fieldName, options }) => {
        createScreenTemplateFileLines.push(
          `const ${fieldName}Options = ${JSON.stringify(options, null, 2)};\n`
        );
      });

      createScreenTemplateFileLines.push(line);
    } else if (line.includes(templatePlaceholders.initialState)) {
      createScreenTemplateFileLines.push(initialStateFields);
      createScreenTemplateFileLines.push(line);
    } else {
      createScreenTemplateFileLines.push(line);
    }
  });

  fs.writeFileSync(createFilePath, createScreenTemplateFileLines.join("\n"));

  const parsedEditScreenTemplateFile = editScreenTemplateFile
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.input, jsxFields.join("\n"))
    .replace(
      templatePlaceholders.validate,
      `if (${requiredFields.map((name) => `entity.${name}`).join(" && ")}) `
    );

  const editScreenTemplateFileLines: string[] = [];
  parsedEditScreenTemplateFile.split("\n").forEach((line) => {
    if (line.includes("const saveEntity = async () => {")) {
      dropdownOptions.forEach(({ fieldName, options }) => {
        editScreenTemplateFileLines.push(
          `const ${fieldName}Options = ${JSON.stringify(options, null, 2)};\n`
        );
      });

      editScreenTemplateFileLines.push(line);
    } else if (line.includes(templatePlaceholders.initialState)) {
      editScreenTemplateFileLines.push(initialStateFields);
      editScreenTemplateFileLines.push(line);
    } else {
      editScreenTemplateFileLines.push(line);
    }
  });

  fs.writeFileSync(editFilePath, editScreenTemplateFileLines.join("\n"));

  const appMenuItemsFile = fs.readFileSync(appMenuItemsFilePath);
  const appMenuItems = JSON.parse(appMenuItemsFile.toString());
  appMenuItems[0].items.push({ label: capitalizedScreenName, to: `/${capitalizedScreenName.toLowerCase()}` });
  fs.writeFileSync(appMenuItemsFilePath, JSON.stringify(appMenuItems, null, 2));

  spinner.start(`Creating types/${capitalizedScreenName.toLowerCase()}.d.ts`);

  const parsedTypesTemplateFile = typesTemplateFile
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(templatePlaceholders.interface, interfaceFields);

  fs.writeFileSync(`./src/types/${capitalizedScreenName.toLowerCase()}.d.ts`, parsedTypesTemplateFile);
  spinner.succeed(`Created ${chalk.cyan(`types/${capitalizedScreenName}.d.ts`)}`);

  spinner.start(`Creating route for ${capitalizedScreenName}`);
  const mainTsx = fs.readFileSync("./src/main.tsx").toString();
  const mainTsxLines = mainTsx.split("\n");

  const newRoutes = [
    `<Route path="${capitalizedScreenName.toLowerCase()}" element={<${capitalizedScreenName}Page />} />`,
    `<Route path="${capitalizedScreenName.toLowerCase()}/create" element={<Create${capitalizedScreenName}Page />} />`,
    `<Route path="${capitalizedScreenName.toLowerCase()}/edit/:id" element={<Edit${capitalizedScreenName}Page />} />`,
  ];

  const newImports = [
    `import ${capitalizedScreenName}Page from "./screens/${capitalizedScreenName}/${capitalizedScreenName}"`,
    `import Edit${capitalizedScreenName}Page from "./screens/${capitalizedScreenName}/Edit${capitalizedScreenName}"`,
    `import Create${capitalizedScreenName}Page from "./screens/${capitalizedScreenName}/Create${capitalizedScreenName}"`,
  ];

  const newMainTsxLines: string[] = [];

  newMainTsxLines.push(...newImports);

  mainTsxLines.forEach((line) => {
    if (line.includes("{/* --ROUTES-- */}")) {
      newRoutes.forEach((newRoute) => {
        newMainTsxLines.push(newRoute);
      });
    }

    newMainTsxLines.push(line);
  });

  fs.writeFileSync("./src/main.tsx", newMainTsxLines.join("\n"));
  spinner.succeed(`Created route: ${chalk.cyan(`/${capitalizedScreenName.toLowerCase()}`)}`);
}
