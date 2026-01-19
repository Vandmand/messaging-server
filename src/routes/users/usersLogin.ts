import express from "express";
import { User } from "@src/database.types";
import { getUser } from "@src/database";
import { addActiveUser } from "@src/activeUsers";

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
    const user = await getUser(json.name);

    if (user?.password !== json.password) {
      res.statusCode = 403;
      res.send("Wrong username or password");
      return;
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send("Something went wrong " + error);
    return;
  }

  const uuid = addActiveUser(json.name);

  res.statusCode = 200;
  res.send(JSON.stringify({ uuid: uuid }));
}
