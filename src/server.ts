import express from "express";
import usersNew from "./routes/users/usersNew";
import usersLogin from "./routes/users/usersLogin";
import usersLogout from "./routes/users/usersLogout";
import messagesIndex from "./routes/messages/messagesIndex";
import messageNew from "./routes/messages/messageNew";
const app = express();

const port = process.env.PORT || 6969;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("haha penis");
});

// User endpoints
app.post("/users/new", usersNew);
app.post("/users/login", usersLogin);
app.post("/users/logout", usersLogout);

// Message endpoints
app.get("/messages", messagesIndex);
app.post("/messages/new", messageNew);

const startServer = () => {
  app.listen(port, () => {
    console.log("Server started");
  });
};

export { app, startServer };
