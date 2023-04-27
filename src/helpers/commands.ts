import { ExecOptions, exec } from "child_process";

export const execAsync = (command: string, options?: ExecOptions) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.log(stderr, "\n", error);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};
