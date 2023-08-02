import fs from "fs-extra";

export const isRootFolder = (absolutePath = process.cwd()) => {
  return fs.readdirSync(absolutePath).includes("kitconfig");
};

export const getCurrentFolderInProject = () => {
  const currentDirName = process.cwd().split("/").at(-1) as string;

  if (
    (currentDirName === "webapp" || currentDirName === "server") &&
    fs.readdirSync("..").includes("kitconfig")
  ) {
    return currentDirName;
  } else if (isRootFolder()) {
    return "root";
  } else {
    return null;
  }
};

export const runInFolderAsync = async <T>(
  folderName: "webapp" | "server" | "root",
  callback: () => Promise<T>,
): Promise<T> => {
  const currentDirName = process.cwd().split("/").at(-1) as string;

  let returnValue: T;

  if (currentDirName === folderName || (isRootFolder() && folderName === "root")) {
    returnValue = await callback();
  } else if (isRootFolder()) {
    process.chdir(folderName);
    returnValue = await callback();
    process.chdir("..");
  } else if (folderName === "root") {
    process.chdir("..");
    returnValue = await callback();
    process.chdir(currentDirName);
  } else {
    process.chdir("..");
    process.chdir(folderName);
    returnValue = await callback();
    process.chdir("..");
    process.chdir(currentDirName);
  }

  return returnValue;
};

export const runInFolderSync = <T>(
  folderName: "webapp" | "server" | "root",
  callback: () => T,
): T => {
  const currentDirName = process.cwd().split("/").at(-1) as string;

  let returnValue: T;

  if (currentDirName === folderName || (isRootFolder() && folderName === "root")) {
    returnValue = callback();
  } else if (isRootFolder()) {
    process.chdir(folderName);
    returnValue = callback();
    process.chdir("..");
  } else if (folderName === "root") {
    process.chdir("..");
    returnValue = callback();
    process.chdir(currentDirName);
  } else {
    process.chdir("..");
    process.chdir(folderName);
    returnValue = callback();
    process.chdir("..");
    process.chdir(currentDirName);
  }

  return returnValue;
};

export const getActiveFolders = () => runInFolderSync("root", () => fs.readdirSync("."));

export const getTemplateFolderPath = () =>
  runInFolderSync("root", () => {
    return process.cwd() + "/.template";
  });
