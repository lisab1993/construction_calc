import React, { useEffect, useState } from "react";

const DecimalHelp = () => {
  const [decimalEntry, setDecimalEntry] = useState(5.375);
  const [output, setOutput] = useState("")

  const handleDecimalChange = (e) => {
    setDecimalEntry(e.target.value);
  };

  const toSixteenth = (largeDecimal) => {
    //takes a decimal without the whole number (0.xxx)
    //multiple the decimal by 16
    let mBySixteen = largeDecimal * 16
    //round this to the nearest whole number
    mBySixteen = Math.round(mBySixteen)
    return mBySixteen + "/" + 16
  }

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
    top = top / x
    bottom = bottom / x
    // return top  + "/" + bottom;
    let outputObj = {
        "top": top,
        "bottom": bottom
    }
    return outputObj
  };



 
  const mixedFraction = (num) => {
    //convert the decimal to a fraction
    let wholeNum = ""
    let decimalPart = ""
    let output = ""
    let chair = ""
    //check if the number is greater than 1
    if (num >= 1){
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
        //fractionPart is an object with the numerator and denomenator separated out
        let fractionPart = toFraction(decimalPart)

        //if the fraction is larger than a 16th, reduce it to the nearest 16th.
        if (fractionPart.bottom > 16) {
            output = wholeNum + " " + toSixteenth(decimalPart)
        } 
        //otherwise, pull the values from the object as they are 
        else {
            output = wholeNum + " ~ " + fractionPart.top + "/" + fractionPart.bottom
        }
    }
    //if the number is smaller than 1:
    else {
        output = toFraction(decimalEntry) 
    }

    return output
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
      <div></div>
    </>
  );
};

export default DecimalHelp;
