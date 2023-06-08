import { capitalize } from "src/helpers/strings";

export const getConfigFile = (screenName: string) => {
  const screen = screenName.toLowerCase();

  return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${capitalize(screen)}",
  url: "/${screen}",
  collectionName: "${screen}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`;
};
