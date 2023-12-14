import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const CurrencyConverter = () => {
  const [first, setFirst] = useState("USD");
  const [second, setSecond] = useState("TZS");
  const [rate, setRate] = useState({});
  const [isCurrencySwitched, setIsCurrencySwitched] = useState(false);

  const getRate = (firstCurrency, secondCurrency) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${firstCurrency}_${secondCurrency}&compact=ultra&apiKey=7d5bee81f017549632c5`
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
        <div className="conversion-result">
          1 {isCurrencySwitched ? second : first} = {rate[`${first}_${second}`]}{" "}
          {isCurrencySwitched ? first : second}
        </div>
        <br />
        <input
          type="text"
          value={isCurrencySwitched ? second : first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <input
          type="text"
          value={isCurrencySwitched ? first : second}
          onChange={(e) => setSecond(e.target.value)}
        />
        <button onClick={() => getRate(first, second)}>Convert</button>
        <button onClick={switchCurrencies}>Switch</button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
