import bcrypt from "bcryptjs";
const hashPassword = async (password) => {
  if (password.length <= 6) {
    throw new Error("Password field should be greater than 6");
  }
  return await bcrypt.hash(password, 10);
};
export { hashPassword as default };
