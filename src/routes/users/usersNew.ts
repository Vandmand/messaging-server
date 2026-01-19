import express from "express";
import { User } from "@src/database.types";
import { createUser } from "@src/database";

export default async function (req: express.Request, res: express.Response) {
  const json = req.body as User;

  if (!json.name) {
    res.statusCode = 400;
    res.send("Missing name field");
  }

  if (!json.password) {
    res.statusCode = 400;
    res.send("Missing password field");
  }

  try {
    await createUser(json);
    res.statusCode = 200;
    res.send("User created");
  } catch (error) {
    res.statusCode = 500;
    res.send("Something went wrong " + error);
  }
}
