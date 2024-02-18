import express from "express";
import { body, query, validationResult } from "express-validator";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

const loggingMiddleWare = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolvingIndexByUserId = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = monckUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex == -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

app.use(loggingMiddleWare);

app.get("/", (req, res) => {
  res.send({ res: "Its Working !!!" });
});

const monckUsers = [
  { id: 1, name: "Fasil Getie", email: "fasil@gmail.com" },
  { id: 2, name: "Hana Getie", email: "hana@gmail.com" },
];

app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Nust not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be 3-10 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    res.send(monckUsers);
  }
);

app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const monckUser = monckUsers.find((user) => user.id === parsedId);
  if (!monckUser) return res.sendStatus(404);
  res.send(monckUser);
});

app.post(
  "/api/users",
  [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage(
        "Name must be at least 5 characters with a max of 30 characters"
      )
      .isString()
      .withMessage("Name must be a string"),
    body("email").notEmpty(),
  ],

  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const { body } = req;
    if (monckUsers.length == 0) return monckUsers.push({ id: 1, ...body });
    const newUser = { id: monckUsers[monckUsers.length - 1].id + 1, ...body };
    monckUsers.push(newUser);
    res.send(newUser);
  }
);

app.put("/api/users/:id", resolvingIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  monckUsers[findUserIndex] = { id: monckUsers[findUserIndex].id, ...body };
  res.sendStatus(200);
});

app.patch("/api/users/:id", resolvingIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  monckUsers[findUserIndex] = { ...monckUsers[findUserIndex], ...body };
  res.sendStatus(200);
});

app.delete("/api/users/:id", resolvingIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  monckUsers.splice(findUserIndex);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
