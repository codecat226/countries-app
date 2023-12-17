import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import login from "./router/login";
import countries from "./router/countries";
import { authCheck } from "./middlewares/authCheck";

const { PORT } = process.env;
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use(authCheck);
app.use("/countries", countries);

app.listen(PORT, (): void => {
  console.log("SERVER IS RUNNING ON PORT:", PORT);
});
