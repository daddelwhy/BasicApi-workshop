import React from "react";
import "./Currency.css";

function Currency(props) {
  const { currencyChoice , selectCurrency,changeCurrency,amout,onChangeAmout} = props;
  return (
    <div className="currency">
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyChoice.map((option)=>
        <option key={option} value={option}>{option}</option>)}
      </select>
      <input type="number" value={amout} onChange={onChangeAmout}/>
    </div>
  );
}

export default Currency;
