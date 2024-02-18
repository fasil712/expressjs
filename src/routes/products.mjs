import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.send({ name: "IPhone", price: 2300, quantity: 2 });
});

export default router;
