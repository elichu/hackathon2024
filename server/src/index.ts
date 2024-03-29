import "reflect-metadata";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "langchain/schema/output_parser";
import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";

export async function initDB() {
  const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    synchronize: true,
    username: "postgres",
    port: 5432,
    password: "admin",
    database: "postgres",
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  return db;
}

export async function getResponse(question: string, db: Promise<SqlDatabase>) {
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
      schema: async () => (await db).getTableInfo(),
      question: (input: { question: string }) => input.question,
    },
    prompt,
    model.bind({ stop: ["\nSQLResult:"] }),
    new StringOutputParser(),
  ]);

  const res = await sqlQueryChain.invoke({
    question: question,
  });
  console.log({ res });
  console.log("complete");
  return res;
}
