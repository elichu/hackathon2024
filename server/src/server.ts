import express from "express";
import { AppDataSource } from "./data-source";
import { getResponse, initDB } from ".";

const app = express();

app.post("/", async (req, res) => {
  AppDataSource.initialize().catch((error) => console.log(error));
});

app.post("/fetch", async (req, res) => {
  let result;

  console.log("init");
  const db = initDB();
  result = await getResponse(req.body, db);
  return res.send(result);
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
