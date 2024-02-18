import express from "express";
import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send({ res: "Its Working !!!" });
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
