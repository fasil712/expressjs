import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.cookie("Hello", "World", { maxAge: 5000 * 10 });
  res.send({ res: "Its Working !!!" });
});

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
