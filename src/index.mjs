import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

const loggingMiddleWare = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolvingIndex = (req, res, next) => {
  next();
};

app.use(loggingMiddleWare);

app.get("/", (req, res) => {
  res.send("Hie its me");
});

const monckUsers = [
  { id: 1, name: "Fasil Getie", email: "fasil@gmail.com" },
  { id: 2, name: "Hana Getie", email: "hana@gmail.com" },
];

app.get("/api/users", (req, res) => {
  res.send(monckUsers);
});

app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const monckUser = monckUsers.find((user) => user.id === parsedId);
  if (!monckUser) return res.sendStatus(404);
  res.send(monckUser);
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  if (monckUsers.length == 0) return monckUsers.push({ id: 1, ...body });
  const newUser = { id: monckUsers[monckUsers.length - 1].id + 1, ...body };
  monckUsers.push(newUser);
  res.send(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = monckUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex == -1) return res.sendStatus(404);
  monckUsers[findUserIndex] = { id: parsedId, ...body };
  res.sendStatus(200);
});

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = monckUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex == -1) return res.sendStatus(404);
  monckUsers[findUserIndex] = { ...monckUsers[findUserIndex], ...body };
  res.sendStatus(200);
});

app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = monckUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex == -1) return res.sendStatus(404);
  monckUsers.splice(findUserIndex);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
