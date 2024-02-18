import express from "express";
import userRoutes from "./routes/users.mjs";
import productRoutes from "./routes/products.mjs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send({ res: "Its Working !!!" });
});

app.use(userRoutes);
app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
