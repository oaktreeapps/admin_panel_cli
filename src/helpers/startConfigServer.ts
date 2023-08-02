import express from "express";
import cors from "cors";
import { configAsync } from "src/config";
import { runInFolderAsync } from "./folders";
import addconfig from "src/commands/addconfig";
import removeResource from "./removeResource";
import updateResource from "./updateResource";

export default function startConfigServer(portNum: number) {
  runInFolderAsync("root", async () => {
    const configServer = express();

    configServer.use(express.json());
    configServer.use(cors());
    configServer.use("/", express.static("kitconfig/.app/dist", { index: "index.html" }));

    const port = configServer.listen(portNum || 5179, () => {
      console.log("Config server is running on port 5179...");
    });

    configServer.post("/api/config/create", async (req, res) => {
      const { name } = req.body;

      await addconfig(name);

      return res.status(201).send(null);
    });

    configServer.post("/api/config/delete", async (req, res) => {
      const { name } = req.body;

      await removeResource(name, { config: true });

      return res.status(200).send(null);
    });

    configServer.post("/api/config/update", async (req, res) => {
      const { name, resource } = req.body;

      await updateResource(name, resource);

      return res.status(200).send(null);
    });

    configServer.get("/api/config", async (_, res) => {
      const config = await configAsync();

      return res.status(200).json(config);
    });

    configServer.get("/api/close", (_, res) => {
      res.status(200).send(null);
      port.close();
    });
  });
}
