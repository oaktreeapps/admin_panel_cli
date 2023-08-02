import { capitalize } from "src/helpers/strings";
import type { KitConfigScreen } from "src/schemas";

export const getConfigFile = (screenName: string, resource?: KitConfigScreen) => {
  const screen = screenName.toLowerCase();

  let resourceString = `{
  name: "${capitalize(screen)}",
  url: "/${screen}",
  collectionName: "${screen}",
  crudFields: [
    // ...
  ],
}`;

  if (resource) {
    resourceString = JSON.stringify(resource, null, 2);
  }

  return `/**
* @type {import('../types').Resource}
*/
const resource = ${resourceString};

resource;
`;
};
