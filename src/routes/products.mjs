import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  res.send({ name: "IPhone", price: 2300, quantity: 2 });
});

export default router;
