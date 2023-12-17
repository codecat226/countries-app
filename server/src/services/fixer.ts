import axios from "axios";

const { FIXER_ACCESS_KEY } = process.env;
const url = `http://data.fixer.io/api/latest?access_key=${FIXER_ACCESS_KEY}`;

type ExchangeRate = {
  currency: string;
  rate?: number;
};

const fetchExchangeRate = async (currencies: string[]) => {
  try {
    const res = await axios.get(url);
    const { rates } = res.data;
    const sekRate = rates.SEK;
    let exchangeRates: ExchangeRate[] = [];
    exchangeRates = currencies.map((item) => {
      const value = rates.hasOwnProperty(item) && rates[item];
      return { currency: item, rate: value / sekRate };
    });
    return exchangeRates;
  } catch (error) {
    console.log(error);
  }
};

export default fetchExchangeRate;
