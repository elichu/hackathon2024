import express from "express";
import { AppDataSource } from "./data-source";
import { getResponse } from ".";

const app = express();

app.post("/", async (req, res) => {
  let result;
  AppDataSource.initialize()
    .then(async () => {
      console.log("init");
      result = await getResponse(req.body);
      return res.send(result);
    })
    .catch((error) => console.log(error));

});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
