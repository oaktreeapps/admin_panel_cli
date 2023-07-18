import inquirer from "inquirer";
import { configAsync } from "src/config";
import addResource from "src/helpers/addResource";

export default async function add(
  resourceNameArg?: string,
  options?: { all?: boolean; force?: boolean; onlyServer?: boolean; onlyWebapp?: boolean },
) {
  const config = await configAsync();

  const configResourceNames =
    config?.resources.map((resource) => ({
      name: resource.name.toLowerCase(),
    })) || [];

  let places: ("webapp" | "server")[] = ["webapp", "server"];
  if (options?.onlyServer) places = ["server"];
  if (options?.onlyWebapp) places = ["webapp"];

  if (options?.all) {
    configResourceNames.forEach(async ({ name }) => {
      await addResource(name, { force: options?.force, places });
    });
  } else if (!resourceNameArg) {
    const answers = await inquirer.prompt([
      {
        name: "resourceNames",
        message: "Please select resources that you want to add to the project:",
        type: "checkbox",
        choices: configResourceNames,
      },
    ]);

    answers?.resourceNames?.forEach(async (screenNameArg: string) => {
      await addResource(screenNameArg, { force: options?.force, places });
    });
  } else if (resourceNameArg) {
    await addResource(resourceNameArg, { force: options?.force, places });
  }
}
