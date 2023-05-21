export const checkExistingUpdateEntity = (capitalizedScreenName: string, uniqueFieldName: string) => {
  if (uniqueFieldName)
    return `const existingUpdateEntity: I${capitalizedScreenName}Entity | null =
  await ${capitalizedScreenName}Model().findOne({
    ${uniqueFieldName},
    _id: { $ne: id },
  });

  if (existingUpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${uniqueFieldName}' already exists",
  };
}`;
  else return "";
};

export const checkExistingCreateEntity = (capitalizedScreenName: string, uniqueFieldName: string) => {
  if (uniqueFieldName)
    return `const { ${uniqueFieldName} } = input;

const existingCreateEntity: I${capitalizedScreenName}Entity | null =
  await ${capitalizedScreenName}Model().findOne({
    ${uniqueFieldName},
  });

if (existingCreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${uniqueFieldName}' already exists",
  };
}`;
  else return "";
};
