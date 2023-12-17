import type { Request, Response } from "express";
import { Router } from "express";
import { JWTPayloadData, generateToken } from "../helpers/jwt";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const data: JWTPayloadData = { id };
    res.status(200).send({ accessToken: generateToken(data), id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
