import open from "open";
import { getCurrentFolderInProject } from "src/helpers/folders";
import startConfigServer from "src/helpers/startConfigServer";

export default async function configure(portArg?: string) {
  if (!getCurrentFolderInProject()) {
    return console.log("You must be in an admin project folder to run this command...");
  }

  const port = portArg ? parseInt(portArg) : 5179;

  startConfigServer(port);
  await open(`http://localhost:${port}`);
}
