import express from "express";
import { removeActiveUser } from "@src/activeUsers";

export default async function (req: express.Request, res: express.Response) {
  const json = req.body as { uuid: string };

  if (!json.uuid) {
    res.statusCode = 400;
    res.send("Missing uuid");
  }

  try {
    removeActiveUser(json.uuid);
    res.statusCode = 200;
    res.send("User sucefully logged out");
  } catch (error) {
    res.statusCode = 500;
    res.send("Something went wrong " + error);
  }
}
