import passport from "passport";
import { Strategy } from "passport";
import { monckUsers } from "../utils/constants.mjs";

export default passport.use(
  new Strategy((email, password, done) => {
    console.log(`Email : ${email}`);
    console.log(`Password : ${password}`);
    try {
      const findUser = monckUsers.find((user) => user.email === email);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
