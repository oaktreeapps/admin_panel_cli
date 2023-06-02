import fs from "fs-extra";

export default function performCleanupServer() {
  fs.removeSync("./.git");

  fs.removeSync("./src/Microservices/XXXXX");
  fs.removeSync("./src/Database/Entities/XXXXXEntity.ts");
}
