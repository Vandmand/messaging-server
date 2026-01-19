import { getActiveUser } from "@src/activeUsers";
import { addMessage, getDb } from "@src/database";
import express from "express";

export default async function (req: express.Request, res: express.Response) {
  const json = req.body as { from: string; content: string };

  if (!json.from) {
    res.statusCode = 400;
    res.send("Missing from field");
  }

  if (!json.content) {
    res.statusCode = 400;
    res.send("Missing content field");
  }

  if (!getActiveUser(json.from)) {
    res.statusCode = 403;
    res.send("No user with that uuid");
  }

  await addMessage(json.from, json.content);
  res.statusCode = 200;
  res.send("Successfully sent message");
}
