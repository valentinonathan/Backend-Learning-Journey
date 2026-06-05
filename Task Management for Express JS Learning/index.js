const express = require("express");
const app = express();
const port = 3000;

const authMiddleware = require("./middleware/auth-middleware.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to A Task Management Backend");
});

const taskRouterJSON = require("./routes/task-route.js").router;
const taskRouterSQL = require("./routes/task-sql-route.js").router;
const authRouter = require("./routes/auth-route.js").router;

app.use("/tasks/json", authMiddleware.authenticateUser, taskRouterJSON);
app.use("/tasks", authMiddleware.authenticateUser, taskRouterSQL);
app.use("/login", authRouter);

app.listen(3000, () => {console.log(`Express server listening on port ${port}`)});
