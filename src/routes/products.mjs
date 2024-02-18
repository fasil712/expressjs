import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies);
  if (req.signedCookies.hello && req.signedCookies.hello === "World") {
    return res.send({ name: "IPhone", price: 2300, quantity: 2 });
  }
  return res.sendStatus(403).send({ msg: "Sory. You need the correct cookie" });
});

export default router;
