import React, { ChangeEvent, useState } from "react";
import countriesService from "../services/countriesService";
import { Country } from "../types/countryTypes";
import "./Countries.css";

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>();
  const [input, setInput] = useState("");
  const [convertInput, setConvertInput] = useState("");
  const [err, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleConvertChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConvertInput(e.target.value);
  };

  const searchCountry = async (name: string) => {
    try {
      const data: Country = await countriesService.getCountry(name);
      setCountry(data);
    } catch (error) {
      setError("Could not find country");
      setShowError(true);
      setCountry(null);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleAdd = () => {
    country && setCountries((prevState) => [...prevState, country]);
  };

  return (
    <main className="mainContainer">
      <section className="mainContainer__section">
        <h1>Search for a country:</h1>
        <div>
          <input
            type="search"
            placeholder="Search a country..."
            onChange={handleChange}
            value={input}
            name="search"
          />
          <button type="submit" onClick={() => searchCountry(input)}>
            Search
          </button>
        </div>
        {showError && <p>{err}</p>}
        {country && (
          <div className="countryItem">
            <p>{country.fullName}</p>
            <p>Population: {country.population}</p>
            {Object.entries(country.currencies).map(([code, currency]) => (
              <p key={code}>{`${currency.name} (${currency.symbol})`}</p>
            ))}
          </div>
        )}
        {country && (
          <button
            onClick={() => {
              handleAdd();
            }}
          >
            Add to my list
          </button>
        )}
      </section>
      {countries && (
        <section>
          <h2>My list:</h2>
          <ul className="countryList">
            {countries.map((item) => {
              const { fullName, population, currencies, rate } = item;
              return (
                <li key={item.fullName} className="countryItem">
                  <p>{fullName}</p>
                  <p>Population: {population}</p>
                  {Object.entries(currencies).map(([code, currency]) => (
                    <p key={code}>{`${currency.name} (${currency.symbol})`}</p>
                  ))}
                  {convertInput &&
                    rate.map(({ currency, rate }) => (
                      <p key={currency}>
                        {`Converted value: ${(
                          Number(convertInput) * Number(rate)
                        ).toFixed(2)} ${currency}`}
                      </p>
                    ))}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {countries.length > 0 && (
        <section>
          <h2>Convert from SEK:</h2>
          <div>
            <input
              type="number"
              placeholder="Enter a value..."
              onChange={handleConvertChange}
              value={convertInput}
              name="conversion"
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default Countries;
