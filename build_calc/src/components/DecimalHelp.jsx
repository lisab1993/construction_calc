import React, { useEffect, useState } from "react";

const DecimalHelp = () => {
  const [decimalEntry, setDecimalEntry] = useState(0.375);

  const handleDecimalChange = (e) => {
    setDecimalEntry(e.target.value);
  };

  const gcd = (a, b) => {
    // this function came from redteam-snippets on github
    // original code: https://gist.github.com/redteam-snippets/3934258
    return b ? gcd(b, a % b) : a;
  };

  const toFraction = (num) => {
    // this function came from redteam-snippets on github
    // original code: https://gist.github.com/redteam-snippets/3934258
    let top = num.toString().replace(/\d+[.]/, "");
    let bottom = Math.pow(10, top.length);
    if (num > 1) {
      top = +top + Math.floor(num) * bottom;
    }
    let x = gcd(top, bottom);
    return top / x + "/" + bottom / x;

  };

  const handleSubmit = async (e) => {
    console.log(toFraction(decimalEntry));
    console.log(decimalEntry, " - decimalEntry state right now");
  };

  return (
    <>
      <span>Enter your decimal: </span>
      <div>
        <input
          type="text"
          name="decimalEntry"
          placeholder="3.75"
          onChange={handleDecimalChange}
          value={decimalEntry}
        />
        <button onClick={handleSubmit}>Go</button>
      </div>
    </>
  );
};

export default DecimalHelp;
