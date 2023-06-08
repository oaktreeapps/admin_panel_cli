import inquirer from "inquirer";
import { configAsync } from "src/config";
import removeResource from "src/helpers/removeResource";

export default async function remove(options?: { all?: boolean }) {
  const config = await configAsync();

  const configResourceNames =
    config?.resources.map((resource) => ({ name: resource.name.toLowerCase() })) || [];

  if (options?.all) {
    configResourceNames.forEach(async ({ name }) => {
      await removeResource(name);
    });
  } else {
    const answers = await inquirer.prompt([
      {
        name: "resourceNames",
        message: "Please select resources that you want to remove from the project:",
        type: "checkbox",
        choices: configResourceNames,
      },
    ]);

    answers?.resourceNames?.forEach(async (screenNameArg: string) => {
      await removeResource(screenNameArg);
    });
  }
}
