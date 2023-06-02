import { capitalize } from "src/helpers/strings";

export const getConfigFile = (screenName: string) => {
  const screen = screenName.toLowerCase();

  return `/**
 * @typedef {import('../types').Screen} Screen
 */
const screen = {
  name: "${capitalize(screen)}",
  url: "/${screen}",
  collectionName: "${screen}",
  crudFields: [
    // ...
  ],
};

module.exports = screen;`;
};
