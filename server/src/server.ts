import express from "express";
import { AppDataSource } from "./data-source";
import { getResponse, initDB } from ".";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  AppDataSource.initialize().catch((error) => console.log(error));
});

app.post("/fetch", async (req, res) => {
  let result;

  console.log("init");

  try {
    const db = initDB();

    result = await getResponse(req.body.text, db);
    return res.send({ text: result });
  } catch {
    res.send({ text: "did not work" });
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
