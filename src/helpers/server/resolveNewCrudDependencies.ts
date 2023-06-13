import fs from "fs-extra";
import { KitConfigScreen } from "src/schemas";
import {
  checkExistingCreateEntity,
  checkExistingUpdateEntity,
} from "src/templateStrings/server/code";
import { getTemplateFolderPath } from "../folders";

const templatePlaceholders = {
  interface: "/*INTERFACE_FIELDS*/",
  schema: "/*SCHEMA_FIELDS*/",
  entity: "/*ENTITY_FIELDS*/",
  zod: "/*ZOD_FIELDS*/",
  uniqueFields: "/*UNIQUE_FIELDS*/",
  checkExistingUpdateEntity: "/*CHECK_EXISTING_UPDATE_ENTITY*/",
  checkExistingCreateEntity: "/*CHECK_EXISTING_CREATE_ENTITY*/",
};

export default async function resolveNewCrudDependencies(
  capitalizedScreenName: string,
  screen: KitConfigScreen,
) {
  const templateFolderPath = getTemplateFolderPath();

  const uniqueFields = screen.crudFields.filter((field) => field.unique).map((field) => field.name);
  const entityFields: string[] = [];
  const interfaceFields: string[] = [];
  const schemafields: string[] = [];
  const zodFields: string[] = [];

  screen.crudFields.forEach(({ name, widget, datatype, required, unique }) => {
    entityFields.push(`${name}: entity.${name},`);

    if (
      widget === "InputText" ||
      widget === "InputTextarea" ||
      widget === "Dropdown" ||
      widget === "RadioButton" ||
      widget === "ImageFileUpload" ||
      widget === "Calendar" ||
      widget === "Password" ||
      widget === "ColorPicker" ||
      widget === "Editor" ||
      datatype === "String"
    ) {
      interfaceFields.push(`${name}${required ? "" : "?"}: string;`);
      schemafields.push(`${name}: { type: String, required: ${required}, unique: ${unique} },`);
      zodFields.push(`${name}: z.string()${required ? ".nonempty()" : ".optional().nullable()"},`);
    } else if (widget === "InputNumber" || datatype === "Number") {
      interfaceFields.push(`${name}${required ? "" : "?"}: number;`);
      schemafields.push(`${name}: { type: Number, required: ${required}, unique: ${unique} },`);
      zodFields.push(`${name}: z.number()${required ? "" : ".optional().nullable()"},`);
    } else if (widget === "InputSwitch" || datatype === "Boolean") {
      interfaceFields.push(`${name}${required ? "" : "?"}: boolean;`);
      schemafields.push(`${name}: { type: Boolean, required: ${required}, unique: ${unique} },`);
      zodFields.push(`${name}: z.boolean()${required ? "" : ".optional().nullable()"},`);
    }
  });

  const folderPath = `./src/Microservices/${capitalizedScreenName}`;

  const adminKitControllerFileContent = fs
    .readFileSync(`${templateFolderPath}/server/XXXXXController.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueFields, uniqueFields.join(", "))
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueFields),
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueFields),
    );

  const adminKitRouterFileContent = fs
    .readFileSync(`${templateFolderPath}/server/XXXXXRouter.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueFields, uniqueFields.join(", "))
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueFields),
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueFields),
    );

  const adminKitDtoFileContent = fs
    .readFileSync(`${templateFolderPath}/server/XXXXX.dto.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueFields, uniqueFields.join(", "))
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueFields),
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueFields),
    );

  const adminKitEntityFileContent = fs
    .readFileSync(`${templateFolderPath}/server/XXXXXEntity.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueFields, uniqueFields.join(", "))
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueFields),
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueFields),
    );

  const controllerFilePath = `${folderPath}/${capitalizedScreenName}Controller.ts`;
  const routerFilePath = `${folderPath}/${capitalizedScreenName}Router.ts`;
  const dtoFilePath = `${folderPath}/${capitalizedScreenName}.dto.ts`;
  const entityFilePath = `./src/Database/Entities/${capitalizedScreenName}Entity.ts`;

  fs.writeFileSync(controllerFilePath, adminKitControllerFileContent);
  fs.writeFileSync(routerFilePath, adminKitRouterFileContent);
  fs.writeFileSync(dtoFilePath, adminKitDtoFileContent);
  fs.writeFileSync(entityFilePath, adminKitEntityFileContent);

  const collectionNamesFile = fs
    .readFileSync("./src/Database/CollectionNames.ts")
    .toString()
    .split("\n")
    .map((line) => {
      if (line.includes("export const ")) {
        return line + "\n" + `${capitalizedScreenName}Collection: "${screen.collectionName}",`;
      }

      return line;
    })
    .join("\n");

  fs.writeFileSync("./src/Database/CollectionNames.ts", collectionNamesFile);

  const apiRouterFile = fs
    .readFileSync("./src/Microservices/ApiRouter.ts")
    .toString()
    .split("\n")
    .map((line) => {
      if (line.includes("const ApiRouter =")) {
        return (
          line +
          "\n" +
          `ApiRouter.use("/${capitalizedScreenName.toLowerCase()}", ${capitalizedScreenName}Router);`
        );
      }

      if (line.includes('import * as express from "express";')) {
        return (
          line +
          "\n" +
          `import { ${capitalizedScreenName}Router } from "./${capitalizedScreenName}/${capitalizedScreenName}Router";`
        );
      }

      return line;
    })
    .join("\n");

  fs.writeFileSync("./src/Microservices/ApiRouter.ts", apiRouterFile);
}
