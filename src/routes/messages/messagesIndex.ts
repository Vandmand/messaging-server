import { getDb } from "@src/database";
import express from "express";

export default async function (req: express.Request, res: express.Response) {
  const db = await getDb;
  db.read();

  res.statusCode = 200;
  res.send(JSON.stringify(db.data.messages));
}
