import jwt from "jsonwebtoken";
const getUserId = (request, requireAuth = true) => {
  const headers = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (headers) {
    const token = headers.replace("Bearer ", "");

    const decodedData = jwt.verify(token, "secret1");

    return decodedData.userId;
  }
  if (requireAuth) {
    throw new Error("Authentication required");
  }
  return null;
};
export { getUserId as default };
