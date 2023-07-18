import inquirer from "inquirer";
import { configAsync } from "src/config";
import removeResource from "src/helpers/removeResource";

export default async function remove(
  resourceNameArg?: string,
  options?: { all?: boolean; onlyServer?: boolean; onlyWebapp?: boolean },
) {
  const config = await configAsync();

  const configResourceNames =
    config?.resources.map((resource) => ({ name: resource.name.toLowerCase() })) || [];

  let places: ("webapp" | "server")[] = ["webapp", "server"];
  if (options?.onlyServer) places = ["server"];
  if (options?.onlyWebapp) places = ["webapp"];

  if (options?.all) {
    configResourceNames.forEach(async ({ name }) => {
      await removeResource(name, { places });
    });
  } else if (!resourceNameArg) {
    const answers = await inquirer.prompt([
      {
        name: "resourceNames",
        message: "Please select resources that you want to remove from the project:",
        type: "checkbox",
        choices: configResourceNames,
      },
    ]);

    answers?.resourceNames?.forEach(async (resourceName: string) => {
      await removeResource(resourceName, { places });
    });
  } else if (resourceNameArg) {
    await removeResource(resourceNameArg, { places });
  }
}
