// 1. Create a NodeJs server which allows you to look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to SEK. Requests should require a valid JWT obtained from a separate /login endpoint.
// Please use the following open APIs for this exercise:
//     1. https://restcountries.com (country lookup and general information)
//     2. https://fixer.io (exchange rates) The assignment requires using the free api key that you can obtain by registering an account at fixer.io

import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import login from "./router/login";
import countries from "./router/countries";

const { PORT } = process.env;
console.log(PORT);

const app: Application = express();

app.use(cors());

app.use("/test", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

// app.use(authCheck)
app.use("/login", login);
app.use("/countries", countries);

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
