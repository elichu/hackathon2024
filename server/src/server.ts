import express from "express";
import { AppDataSource } from "./data-source";
import { getResponse, initDB } from ".";

const app = express();

app.post("/", async (req, res) => {
  let result;
  AppDataSource.initialize()
    .then(async () => {
      console.log("init");
      const db = initDB();
      result = await getResponse(req.body, db);
      return res.send(result);
    })
    .catch((error) => console.log(error));

});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
