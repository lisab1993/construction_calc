import React, { useEffect, useState } from "react";

const DecimalHelp = () => {
  const [decimalEntry, setDecimalEntry] = useState(5.375);

  const handleDecimalChange = (e) => {
    setDecimalEntry(e.target.value);
  };

  const gcd = (a, b) => {
    // this function came from redteam-snippets on github
    // original code: https://gist.github.com/redteam-snippets/3934258
    return b ? gcd(b, a % b) : a;
  };

  const toFraction = (num) => {
    // this function will not serve its purpose here when applied to decimal numbers larger than 1 (0.5 is okay; 5.5 is not okay)
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

 
  const mixedFraction = (num) => {
    //1. pull out the whole number, if applicable
    //2. don't change it. 
    //3. everything after the decimal will put use the toFraction function
    let wholeNum = ""
    let decimalPart = ""
    if (num >= 1){
        //I need every number to the left of the decimal, in order
        //convert the number to a string
        let textNum = num.toString()
        //split the string into an array
        let textNumArr = textNum.split('')
        //find the index of the decimal
        let decimalIndex = textNumArr.indexOf('.')
        //create an array from the numbers to the left of the decimal
        let wholeNumArr = textNumArr.slice(0, decimalIndex)
        //convert whe whole number array into a string
        wholeNum = wholeNumArr.join('')
        //convert the whole number string into a number
        wholeNum = parseInt(textNum)
        decimalPart = num - wholeNum
        let fractionPart = toFraction(decimalPart)
        let output = wholeNum + " ~ " + fractionPart
        // let decimalFraction = toFraction()
        return output
    }else {
        return toFraction(decimalEntry)
    }

  }

  const handleSubmit = async (e) => {
    console.log(mixedFraction(decimalEntry), 'mixed fraction output')
    // console.log(decimalEntry, " - decimalEntry state right now");
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
