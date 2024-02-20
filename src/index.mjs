import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./routes/index.mjs";
import { monckUsers } from "./utils/constants.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser("cookie_secret"));
app.use(
  session({
    secret: "fasil session",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "World", { maxAge: 50000 * 10, signed: true });
  res.send({ res: "Its Working !!!" });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { email, password },
  } = req;
  const findUser = monckUsers.find((user) => user.email === email);
  if (!findUser || findUser.password !== password) {
    return res.status(401).send({ msg: "BAD CREADENTIALS" });
  }
  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
