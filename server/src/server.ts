import express from "express";
import { AppDataSource } from "./data-source";
import { getResponse } from ".";

const app = express();

app.get("/", (req, res) => {
  AppDataSource.initialize()
    .then(async () => {
      console.log("init");
      getResponse();
    })
    .catch((error) => console.log(error));

  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
