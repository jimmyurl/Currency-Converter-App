import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import "./styles.css";

const CurrencyConverter = () => {
  const [first, setFirst] = useState("USD");
  const [second, setSecond] = useState("TZS");
  const [amount, setAmount] = useState("1");
  const [rate, setRate] = useState({});
  const [convertedAmount, setConvertedAmount] = useState("0");

  // Predefined list of currencies
  const currencies = [
    "USD",
    "TZS",
    "EUR",
    "GBP",
    "KES",
    "UGX",
    "JPY",
    "CNY",
    "AUD",
    "CAD",
    // Add more currencies as needed
  ];

  // Fetch exchange rate from API
  const getRate = (firstCurrency, secondCurrency) => {
    axios
      .get(
        `https://free.currconv.com/api/v7/convert?q=${firstCurrency}_${secondCurrency}&compact=ultra&apiKey=0ecb19b82fbf6c3e1979`
      )
      .then((response) => {
        setRate(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the exchange rate:", error);
        setRate({});
      });
  };

  // Fetch rate when currencies change
  useEffect(() => {
    getRate(first, second);
  }, [first, second]);

  // Automatically convert when rate or amount changes
  useEffect(() => {
    convert();
  }, [rate, amount]);

  const convert = () => {
    const rateKey = `${first}_${second}`;
    const rateValue = rate[rateKey];
    if (!isNaN(rateValue) && amount !== "") {
      const converted = parseFloat(rateValue) * parseFloat(amount);
      setConvertedAmount(converted.toFixed(2));
    } else {
      setConvertedAmount("0");
    }
  };

  const switchCurrencies = () => {
    setFirst(second);
    setSecond(first);
  };

  return (
    <div className="container">
      <div className="brand-logo"></div>
      <div className="brand-title">FOREIGN EXCHANGE RATES</div>
      <div className="inputs">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
        />
      </div>
      <div className="inputs">
        <label htmlFor="from-currency">From:</label>
        <select
          id="from-currency"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="inputs">
        <label htmlFor="to-currency">To:</label>
        <select
          id="to-currency"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={switchCurrencies}>Switch</button>

      {rate[`${first}_${second}`] && (
        <div className="conversion-result">
          {parseFloat(amount).toLocaleString("en-US")} {first} ={" "}
          {parseFloat(convertedAmount).toLocaleString("en-US")} {second}
        </div>
      )}
    </div>
  );
};

render(<CurrencyConverter />, document.querySelector("#root"));
