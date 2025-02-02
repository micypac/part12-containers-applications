const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let todoCount = await getAsync("added_todos");
  todoCount++;
  setAsync("added_todos", todoCount);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();

  let todoCount = await getAsync("added_todos");
  todoCount--;
  setAsync("added_todos", todoCount);

  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.status(200).send(req.todo);
  // res.sendStatus(200); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const body = req.body;

  req.todo.text = body.text;
  req.todo.done = body.done;

  try {
    await req.todo.save();
    res.json(req.todo);
  } catch (err) {
    console.error(err);
  }

  // res.sendStatus(405); // Implement this
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
