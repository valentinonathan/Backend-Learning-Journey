const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to A Task Management Backend");
});

const taskRouterJSON = require("./routes/task-route.js").router;
const taskRouterSQL = require("./routes/task-sql-route.js").router;
app.use("/tasks/json", taskRouterJSON);
app.use("/tasks/sql", taskRouterSQL);

app.listen(3000, () => {console.log(`Express server listening on port ${port}`)});
