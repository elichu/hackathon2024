import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "langchain/schema/output_parser";
import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";

async function getResponse() {
  const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    synchronize: true,
    username: "postgres",
    port: 5432,
    password: "admin",
    database: "dvdrental",
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
  });

  const prompt =
    PromptTemplate.fromTemplate(`Based on the provided SQL table schema below, write a SQL query that would answer the user's question.
    ------------
    SCHEMA: {schema}
    ------------
    QUESTION: {question}
    ------------
    SQL QUERY:`);
  const sqlQueryChain = RunnableSequence.from([
    {
      schema: async () => db.getTableInfo(),
      question: (input: { question: string }) => input.question,
    },
    prompt,
    model.bind({ stop: ["\nSQLResult:"] }),
    new StringOutputParser(),
  ]);

  const res = await sqlQueryChain.invoke({
    question: "What is the name of the second student in the students table?",
  });
  console.log({ res });
  console.log("complete");
}

AppDataSource.initialize()
  .then(async () => {
    console.log("init");
    getResponse();
  })
  .catch((error) => console.log(error));
