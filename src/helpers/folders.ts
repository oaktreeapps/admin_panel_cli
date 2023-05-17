import fs from "fs-extra";

export const isRootFolder = (absolutePath = process.cwd()) => {
  return fs.readdirSync(absolutePath).includes("kit.config.json");
};

export const runInFolder = async (
  folderName: "webapp" | "server" | "root",
  callback: () => Promise<void>
) => {
  const currentDirName = process.cwd().split("/").at(-1) as string;

  if (currentDirName === folderName) {
    await callback();
  } else if (isRootFolder()) {
    process.chdir(folderName);
    await callback();
    process.chdir("..");
  } else {
    process.chdir("..");
    process.chdir(folderName);
    await callback();
    process.chdir("..");
    process.chdir(currentDirName);
  }
};
