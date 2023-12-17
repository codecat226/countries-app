import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "secret";

export type JWTPayloadData = {
  id: string | undefined;
};

export const generateToken = (data: JWTPayloadData) =>
  jwt.sign(data, secret, { expiresIn: "60m" });

export const validateToken = (token: string) => {
  const decoded: JWTPayloadData = {
    id: "",
  };
  try {
    const payload = jwt.verify(token, secret);
    if (typeof payload !== "object") throw new Error("JWT error");
    decoded.id = payload.id;
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
