import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./routes/index.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs";

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

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "World", { maxAge: 50000 * 10, signed: true });
  res.send({ res: "Its Working !!!" });
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
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

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  return res.send(req.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log(`Running with port ${PORT}.`);
});
