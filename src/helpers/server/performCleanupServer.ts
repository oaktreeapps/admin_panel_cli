import fs from "fs-extra";

export default function performCleanupServer() {
  fs.removeSync("./.git");
  fs.removeSync("./yarn.lock");

  fs.removeSync("./src/Microservices/XXXXX");
  fs.removeSync("./src/Database/Entities/XXXXXEntity.ts");
}
