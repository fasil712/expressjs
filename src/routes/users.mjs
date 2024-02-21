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
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

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
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return send(result.array());
    const data = matchedData(req);
    console.log(data);
    data.password = hashPassword(data.password);
    console.log(data);
    const { body } = req;
    const newUser = new User(body);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
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
