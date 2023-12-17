import type { Request, Response } from "express";
import { Router } from "express";
import fetchCountry from "../services/countries";
import fetchExchangeRate from "../services/fixer";

const router = Router();

router.get("/:country", async (req: Request, res: Response) => {
  const { country } = req.params;
  try {
    const data = await fetchCountry(country);
    const { currencies, name, population } = data;
    const currenciesData = Object.keys(currencies);
    const rateData = await fetchExchangeRate(currenciesData);
    const countryData = {
      fullName: name.official,
      population: population,
      currencies: currencies,
      rate: rateData,
    };
    res.status(200).send(countryData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
