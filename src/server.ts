import express from "express";
import routes from "./routes/routes";

const app = express();

const port = process.env.PORT || 6969;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("haha penis");
});

// User endpoints
app.post("/users/new", routes.users.new);
app.post("/users/login", routes.users.login);
app.post("/users/logout", routes.users.logout);

// Message endpoints
app.get("/messages", routes.messages.index);
app.post("/messages/new", routes.messages.new);

/**
 * Starts the server
 */
const startServer = () => {
  app.listen(port, () => {
    console.log("Server started");
  });
};

export { app, startServer };
