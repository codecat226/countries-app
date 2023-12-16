import axios from 'axios';

const baseURL = "https://restcountries.com/v3.1"

const fetchCountry = async (name: string) => {
  try {
    const res = await axios.get(`${baseURL}/name/${name}?fullText=true&fields=currencies,name,population`);
    console.log("countriesRes", res.data);
    return res.data[0];
  } catch (error) {
    console.log(error);
  }
}

export default fetchCountry;