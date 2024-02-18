import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { monckUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolvingIndexByUserId } from "../utils/middleware.mjs";

const router = Router();

router.get(
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
    const {
      query: { filter, value },
    } = req;
    if (filter && value) {
      return res.send(
        monckUsers.filter((user) => user[filter].includes(value))
      );
    }
    res.send(monckUsers);
  }
);
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const data = matchedData(req);
    console.log(data);
    const { body } = req;
    if (monckUsers.length == 0) return monckUsers.push({ id: 1, ...body });
    const newUser = { id: monckUsers[monckUsers.length - 1].id + 1, ...body };
    monckUsers.push(newUser);
    res.send(newUser);
  }
);
router.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const monckUser = monckUsers.find((user) => user.id === parsedId);
  if (!monckUser) return res.sendStatus(404);
  res.send(monckUser);
});
router.put("/api/users/:id", resolvingIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  monckUsers[findUserIndex] = { id: monckUsers[findUserIndex].id, ...body };
  res.sendStatus(200);
});
router.patch("/api/users/:id", resolvingIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  monckUsers[findUserIndex] = { ...monckUsers[findUserIndex], ...body };
  res.sendStatus(200);
});
router.delete("/api/users/:id", resolvingIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  monckUsers.splice(findUserIndex);
  res.sendStatus(200);
});
export default router;
