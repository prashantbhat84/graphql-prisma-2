import jwt from "jsonwebtoken";

const jsontoken = (user) => {
  return jwt.sign({ user }, "secret1", {
    expiresIn: "7 days",
  });
};

export { jsontoken as default };
