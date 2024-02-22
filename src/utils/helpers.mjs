import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  console.log(salt);
  return bcrypt.hash(password, salt);
};
