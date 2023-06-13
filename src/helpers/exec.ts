import { exec } from "child_process";

export default async function execAsync(command: string) {
  return new Promise((resolve) => {
    exec(command, () => {
      resolve(null);
    });
  });
}
