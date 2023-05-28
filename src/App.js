import { useEffect, useState } from "react";
import "./App.css";
import Currency from "./com/Currency";
import money from "./img/money.png";

function App() {
  const [currencyChoice, setCurrencyChoice] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("THB");
  const [amout, setAmout] = useState(1);
  const [exChaneRate, setExchangeRate] = useState(0);
  const [chechkFromCurrency, setCheckFromCurrency] = useState(true);
  let fromAmout, toAmout;
  const amoutFromCurrency = (e) => {
    setAmout(e.target.value);
    setCheckFromCurrency(true);
  };
  const amoutToCurrency = (e) => {
    setAmout(e.target.value);
    setCheckFromCurrency(false);
  };
  if (chechkFromCurrency) {
    fromAmout = amout;
    toAmout = (amout * exChaneRate).toFixed(2); //เงินปลาย
  } else {
    toAmout = amout;
    fromAmout = (amout / exChaneRate).toFixed(2); //เงินต้น
  }
  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyChoice([...Object.keys(data.rates)]);
        setExchangeRate(data.rates[toCurrency]);
      }); ////สกุลเงินปลายทาง
  }, [fromCurrency, toCurrency]);
  return (
    <>
      <main>
        <img src={money} alt="money" />
        <h2>change ur money</h2>
        <div className="container">
          <Currency
            currencyChoice={currencyChoice}
            selectCurrency={fromCurrency}
            changeCurrency={(e) => setFromCurrency(e.target.value)}
            amout={fromAmout}
            onChangeAmout={amoutFromCurrency}
          />
          <div className="equal"> = </div>
          <Currency
            currencyChoice={currencyChoice}
            selectCurrency={toCurrency}
            changeCurrency={(e) => setToCurrency(e.target.value)}
            amout={toAmout}
            onChangeAmout={amoutToCurrency}
          />
        </div>
      </main>
    </>
  );
}

export default App;
