import inquirer from "inquirer";
import { configAsync } from "src/config";
import addResource from "src/helpers/addResource";

export default async function add(options?: { all?: boolean }) {
  const config = await configAsync();

  const configResourceNames =
    config?.resources.map((resource) => ({
      name: resource.name.toLowerCase(),
    })) || [];

  if (options?.all) {
    configResourceNames.forEach(async ({ name }) => {
      await addResource(name);
    });
  } else {
    const answers = await inquirer.prompt([
      {
        name: "resourceNames",
        message: "Please select resources that you want to add to the project:",
        type: "checkbox",
        choices: configResourceNames,
      },
    ]);

    answers?.resourceNames?.forEach(async (screenNameArg: string) => {
      await addResource(screenNameArg);
    });
  }
}
