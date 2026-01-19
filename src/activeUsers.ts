import { randomUUID } from "crypto";

const activeUsers: Record<string, string> = {};

const addActiveUser = (name: string) => {
  const uuid = randomUUID();

  activeUsers[uuid] = name;

  return uuid;
};

const removeActiveUser = (uuid: string) => {
  if (!activeUsers[uuid]) {
    throw new Error("No user with that uuid");
  }

  delete activeUsers[uuid];
};

const getActiveUser = (uuid: string) => {
  return activeUsers[uuid];
};

export { addActiveUser, removeActiveUser, getActiveUser };
