import fs from "fs-extra";
import {
  Calendar,
  ColorPicker,
  Dropdown,
  Editor,
  FileUpload,
  InputNumber,
  InputSwitch,
  InputText,
  InputTextarea,
  Password,
  RadioButtonField,
} from "src/templateStrings/formFields";
import { ImageColumn, TextColumn } from "src/templateStrings/mainFileColumns";
import { KitConfigScreen } from "src/schemas";
import { getTemplateFolderPath } from "../folders";

const templatePlaceholders = {
  tableColumns: "{/*TABLE_COLUMNS*/}",
  initialState: "/*INITIAL_STATE_FIELDS*/",
  interface: "/*INTERFACE_FIELDS*/",
  input: "{/*INPUT_FIELDS*/}",
  validate: "/*VALIDATE_FIELDS*/",
};

export default async function resolveNewScreenDependencies(
  capitalizedScreenName: string,
  screen: KitConfigScreen
) {
  const templateFolderPath = getTemplateFolderPath();

  let interfaceFields = "";
  let initialStateFields = "";
  const requiredFields: string[] = [];
  const jsxFields: string[] = [];
  const tableColumns: string[] = [];
  const dropdownOptions: { fieldName: string; options: any[] }[] = [];

  const neverRequiredInputTypes = ["InputSwitch"];

  screen.crudFields.forEach((field, index) => {
    const type = field.widget || field.datatype;

    let interfacePropertyType = "";
    let initialValue = "";

    if (field.required && !neverRequiredInputTypes.includes(field.widget || field.datatype || ""))
      requiredFields.push(field.name);

    if (type === "InputText" || type === "String") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputText(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "InputTextarea") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputTextarea(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "InputNumber" || type === "Number") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputNumber(field));
      interfacePropertyType = "number";
      initialValue = `0`;
    } else if (type === "Dropdown") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(Dropdown(field));
      dropdownOptions.push({ fieldName: field.name, options: field.options || [] });
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "RadioButton") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(RadioButtonField(field, field.options || []));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "ImageFileUpload") {
      if (field.tableDisplay) tableColumns.push(ImageColumn(field.name));
      jsxFields.push(FileUpload(field, screen.name.toLowerCase()));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "InputSwitch" || type === "Boolean") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(InputSwitch(field));
      interfacePropertyType = "boolean";
      initialValue = `false`;
    } else if (type === "Calendar") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(Calendar(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "Password") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(Password(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "ColorPicker") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(ColorPicker(field));
      interfacePropertyType = "string";
      initialValue = `""`;
    } else if (type === "Editor") {
      if (field.tableDisplay) tableColumns.push(TextColumn(field.name));
      jsxFields.push(Editor(field));
      interfacePropertyType = "string";
      initialValue = `""`;
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

  const mainScreenTemplateFile = fs.readFileSync(`${templateFolderPath}/webapp/XXXXX.tsx`).toString();
  const createScreenTemplateFile = fs.readFileSync(`${templateFolderPath}/webapp/CreateXXXXX.tsx`).toString();
  const editScreenTemplateFile = fs.readFileSync(`${templateFolderPath}/webapp/EditXXXXX.tsx`).toString();
  const typesTemplateFile = fs.readFileSync(`${templateFolderPath}/webapp/xxxxx.d.ts`).toString();

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

  const parsedTypesTemplateFile = typesTemplateFile
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(templatePlaceholders.interface, interfaceFields);

  fs.writeFileSync(`./src/types/${capitalizedScreenName.toLowerCase()}.d.ts`, parsedTypesTemplateFile);

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
}
