import axios from 'axios';
const {FIXER_ACCESS_KEY } = process.env;
const url = `http://data.fixer.io/api/latest?access_key=${FIXER_ACCESS_KEY}`
type ExchangeRate = {
  currency: string;
  rate?: number;
}
const fetchExchangeRate = async (currencies: string[]) => {
  try {
    const res = await axios.get(url);
    // console.log("fixerRes", res.data);
    
    const sekRate = res.data.rates.SEK;
    console.log("SekRate", sekRate);
    let exchangeRates: ExchangeRate[] = [];
    exchangeRates = currencies.map((item) => {
      const value = res.data.rates.hasOwnProperty(item) && res.data.rates[item];
      return({currency: item, rate: value/sekRate});
    })

    return exchangeRates;
  } catch (error) {
    console.log(error);
  }
}

export default fetchExchangeRate;