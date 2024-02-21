import passport from "passport";
import { Strategy } from "passport-local";
import { monckUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log("Iside Ser User");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Insdie DeS");
  console.log(`Des User ID : ${id}`);
  try {
    const findUser = monckUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username : ${username}`);
    console.log(`Password : ${password}`);
    try {
      const findUser = monckUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
