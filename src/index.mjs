import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());

app.use(cookieParser("cookie_secret"));
app.use(routes);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.cookie("hello", "World", { maxAge: 5000 * 10, signed: true });
  res.send({ res: "Its Working !!!" });
});

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
