import fs from "fs-extra";
import { adminKitPath } from "src";
import { KitConfig } from "src/schemas";
import {
  checkExistingCreateEntity,
  checkExistingUpdateEntity,
} from "src/templateStrings/server/codeTemplates";

const templatePlaceholders = {
  interface: "/*INTERFACE_FIELDS*/",
  schema: "/*SCHEMA_FIELDS*/",
  entity: "/*ENTITY_FIELDS*/",
  zod: "/*ZOD_FIELDS*/",
  uniqueField: "/*UNIQUE_FIELD*/",
  checkExistingUpdateEntity: "/*CHECK_EXISTING_UPDATE_ENTITY*/",
  checkExistingCreateEntity: "/*CHECK_EXISTING_CREATE_ENTITY*/",
};

export default async function resolveNewCrudDependencies(
  capitalizedScreenName: string,
  screen: KitConfig["screens"][number]
) {
  let uniqueField = screen.crudFields.filter((field) => field.unique)?.[0]?.name || "";
  const entityFields: string[] = [];
  const interfaceFields: string[] = [];
  const schemafields: string[] = [];
  const zodFields: string[] = [];

  screen.crudFields.forEach(({ name, type, required }) => {
    entityFields.push(`${name}: entity.${name},`);

    if (type === "InputText" || type === "InputTextarea" || type === "Dropdown" || type === "RadioButton") {
      interfaceFields.push(`${name}${required ? "" : "?"}: string;`);
      schemafields.push(`${name}: { type: String, required: ${required} },`);
      zodFields.push(`${name}: z.string()${required ? ".nonempty()" : ".optional()"},`);
    } else if (type === "InputNumber") {
      interfaceFields.push(`${name}${required ? "" : "?"}: number;`);
      schemafields.push(`${name}: { type: Number, required: ${required} },`);
      zodFields.push(`${name}: z.number()${required ? "" : ".optional()"},`);
    } else if (type === "InputSwitch") {
      interfaceFields.push(`${name}${required ? "" : "?"}: boolean;`);
      schemafields.push(`${name}: { type: Boolean, required: ${required} },`);
      zodFields.push(`${name}: z.boolean()${required ? "" : ".optional()"},`);
    }
  });

  const folderPath = `./src/Microservices/${capitalizedScreenName}`;

  const adminKitControllerFileContent = fs
    .readFileSync(`${adminKitPath}/server/XXXXXController.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueField, uniqueField)
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueField)
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueField)
    );

  const adminKitRouterFileContent = fs
    .readFileSync(`${adminKitPath}/server/XXXXXRouter.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueField, uniqueField)
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueField)
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueField)
    );

  const adminKitDtoFileContent = fs
    .readFileSync(`${adminKitPath}/server/XXXXX.dto.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueField, uniqueField)
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueField)
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueField)
    );

  const adminKitEntityFileContent = fs
    .readFileSync(`${adminKitPath}/server/XXXXXEntity.ts`)
    .toString()
    .replace(/XXXXX/g, capitalizedScreenName)
    .replace(/xxxxx/g, capitalizedScreenName.toLowerCase())
    .replace(templatePlaceholders.interface, interfaceFields.join("\n"))
    .replace(templatePlaceholders.schema, schemafields.join("\n"))
    .replace(templatePlaceholders.entity, entityFields.join("\n"))
    .replace(templatePlaceholders.zod, zodFields.join("\n"))
    .replace(templatePlaceholders.uniqueField, uniqueField)
    .replace(
      templatePlaceholders.checkExistingCreateEntity,
      checkExistingCreateEntity(capitalizedScreenName, uniqueField)
    )
    .replace(
      templatePlaceholders.checkExistingUpdateEntity,
      checkExistingUpdateEntity(capitalizedScreenName, uniqueField)
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
