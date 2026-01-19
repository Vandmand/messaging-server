import { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";
import { Database, User } from "./database.types";
import { getActiveUser } from "./activeUsers";

const defaultData: Database = { users: [], messages: [] };
const getDb: Promise<Low<Database>> = JSONFilePreset(
  "messages.json",
  defaultData,
);

const hasUser = async (name: string) => {
  const db = await getDb;
  db.read();
  const userIndex = db.data.users.findIndex((user) => user.name === name);

  return userIndex !== -1;
};

const createUser = async (user: User) => {
  const db = await getDb;

  if (await hasUser(user.name)) {
    throw new Error("User already exists");
  }

  await db.update(({ users }) => {
    users.push(user);
  });
};

const getUser = async (name: string) => {
  const db = await getDb;

  await db.read();

  return db.data.users.find((user) => user.name === name);
};

const addMessage = async (from: string, content: string) => {
  const db = await getDb;

  await db.update(({ messages }) => {
    messages.push({
      from: getActiveUser(from),
      sentAt: new Date(),
      content: content,
    });
  });
};

export { getDb, createUser, getUser, hasUser, addMessage };
