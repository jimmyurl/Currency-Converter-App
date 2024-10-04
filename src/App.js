import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const CurrencyConverter = () => {
  const [first, setFirst] = useState("USD");
  const [second, setSecond] = useState("TZS");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState({});
  const [isCurrencySwitched, setIsCurrencySwitched] = useState(false);

  const currencies = ["USD", "TZS", "EUR", "GBP", "KES", "UGX"]; // Add more currencies as needed

  const getRate = (firstCurrency, secondCurrency) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${firstCurrency}_${secondCurrency}&compact=ultra&apiKey=0ecb19b82fbf6c3e1979`
    })
      .then((response) => {
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
        setRate({});
      });
  };

  useEffect(() => {
    getRate(first, second);
  }, [first, second]);

  const switchCurrencies = () => {
    setIsCurrencySwitched(!isCurrencySwitched);
    setFirst(second);
    setSecond(first);
  };

  return (
    <div>
      <h1 className="heading">Currency Converter</h1>
      <div className="currency-converter">
        <div className="conversion-result" style={{ color: "red" }}>
          {amount} {isCurrencySwitched ? second : first} ={" "}
          {rate[`${first}_${second}`]
            ? (rate[`${first}_${second}`] * amount).toFixed(2)
            : "Error"}{" "}
          {isCurrencySwitched ? first : second}
        </div>
        <br />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <select
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button onClick={switchCurrencies}>Switch</button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
