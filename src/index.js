import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import "./styles.css";

const CurrencyConverter = () => {
  const [first, setFirst] = useState("USD");
  const [second, setSecond] = useState("TZS");
  const [rate, setRate] = useState({});
  const [amount, setAmount] = useState("1"); // New state for the amount to convert
  const [convertedAmount, setConvertedAmount] = useState("0"); // New state for the converted amount

  const getRate = (firstCurrency, secondCurrency) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${firstCurrency}_${secondCurrency}&compact=ultra&apiKey=da16fc97221dfb6e875c`
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

  useEffect(() => {
    convert(); // Automatically convert when the rate or amount changes
  }, [rate, amount]);

  const convert = () => {
    const rateValue = rate[`${first}_${second}`];
    if (!isNaN(rateValue) && amount !== "") {
      const convertedAmount = parseFloat(rateValue) * parseFloat(amount);
      setConvertedAmount(convertedAmount.toFixed(2));
    } else {
      setConvertedAmount("0");
    }
  };

  const handleConvert = () => {
    convert(); // Trigger currency conversion
  };

  const handleSwitch = () => {
    const temp = first;
    setFirst(second);
    setSecond(temp);
  };

  return (
    <div>
      <div className="">
        <div className="brand-title">FOREIGN EXCHANGE RATES.</div>
        <div className="inputs">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="inputs">
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            placeholder="Enter source currency code"
          />
        </div>
        <div className="inputs">
          <input
            type="text"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder="Enter target currency code"
          />
        </div>
        <button onClick={handleSwitch}>Switch</button>
        <button onClick={handleConvert}>Convert</button>{" "}
        {/* Added Convert button */}
      </div>
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
