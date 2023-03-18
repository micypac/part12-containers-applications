const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { getAsync } = require("./redis");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.get("/statistics", async (req, res) => {
  const count = await getAsync("added_todos");
  res.json({
    added_todos: count,
  });
});

module.exports = app;
