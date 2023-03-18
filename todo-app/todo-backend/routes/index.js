const express = require("express");
const router = express.Router();
const redis = require("../redis");
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis");

const configs = require("../util/config");

let visits = 0;
let todoCount = 0;

// setAsync("added_todos", todoInitCount);

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;
  todoCount = await Todo.find({}).estimatedDocumentCount();
  setAsync("added_todos", todoCount);
  // console.log("Count", todoCount);

  res.send({
    ...configs,
    visits,
  });
});

module.exports = router;
