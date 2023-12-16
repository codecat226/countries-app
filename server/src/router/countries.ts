import type { Request, Response } from "express";
import { Router } from "express";
import fetchCountry from "../services/countries";
import fetchExchangeRate from "../services/fixer";

const router = Router();

router.get("/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const data = await fetchCountry(name);
    const currencies = Object.keys(data.currencies)
    console.log("currencies", currencies);
    const rateData = await fetchExchangeRate(currencies)
    console.log("rateData", rateData);
    // add type
    console.log(data);
    const countryData = {
      fullName: data.name.official,
      population: data.population,
      currencies: data.currencies,
      rate: rateData,
    }
    res.status(200).send(countryData);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Internal server error'})
  }
});

export default router;
