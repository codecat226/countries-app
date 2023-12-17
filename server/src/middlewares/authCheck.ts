import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ ERROR: "Unauthorized" });
  jwt.verify(token, process.env.SECRET as string, (err: any, data: any) => {
    console.log(err);
    if (err) return res.sendStatus(418);
    next();
  });
};
