import { capitalize } from "src/helpers/strings";

export const checkExistingUpdateEntity = (
  capitalizedScreenName: string,
  uniqueFieldNames: string[],
) => {
  let checkString = ``;

  uniqueFieldNames
    .filter((value) => !!value)
    .forEach((uniqueFieldName) => {
      checkString += `const existing${capitalize(
        uniqueFieldName,
      )}UpdateEntity: I${capitalizedScreenName}Entity | null =
await ${capitalizedScreenName}Model().findOne({
  ${uniqueFieldName},
  _id: { $ne: id },
});

if (existing${capitalize(uniqueFieldName)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${uniqueFieldName}' already exists",
  };
}
`;
    });

  return checkString;
};

export const checkExistingCreateEntity = (
  capitalizedScreenName: string,
  uniqueFieldNames: string[],
) => {
  let checkString = `const { ${uniqueFieldNames.join(", ")} } = input;\n`;

  uniqueFieldNames
    .filter((value) => !!value)
    .forEach((uniqueFieldName) => {
      checkString += `
const existing${capitalize(uniqueFieldName)}CreateEntity: I${capitalizedScreenName}Entity | null =
  await ${capitalizedScreenName}Model().findOne({
    ${uniqueFieldName},
  });

if (existing${capitalize(uniqueFieldName)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${uniqueFieldName}' already exists",
  };
}
`;
    });

  return checkString;
};
