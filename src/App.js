import Wrapper from "./Wrapper";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import { useState } from "react";

const btnValues = [
  [{id: "clear", value: "AC"}, {id: "divide", value: "/"}, {id: "multiply", value: "X"}],
  [{id: "seven", value: 7}, {id: "eight", value: 8}, {id: "nine", value: 9}, {id: "subtract", value: "-"}],
  [{id: "four", value: 4},{id: "five", value: 5}, {id: "six", value: 6}, {id: "add", value: "+"}],
  [{id: "one", value: 1}, {id: "two", value: 2}, {id: "three", value: 3},{id: "equals", value: "="} ],
  [{id: "zero", value: 0}, {id: "decimal", value: "."}]
]


const App = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
    prevRes: 0, 
    neg: false
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    if (!calc.sign){
     setCalc({
       ...calc,
       num:
         calc.num === 0 && value === "0"
           ? 0
           : calc.num % 1 === 0 && value !== "0" 
           ? Number(calc.num + value)
           : calc.num + value,
       res: 0,
     });      
    } else {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
  
      setCalc({
        ...calc,
       num:
         calc.num === 0 && value === "0"
           ? 0
           : calc.num % 1 === 0 && value !== "0" 
           ? Number(calc.num + value)
           : calc.num + value,        
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : calc.neg
            ? math(Number(calc.res), Number((calc.num + value) * -1), calc.sign)
            : math(Number(calc.res), Number(calc.num + value), calc.sign),
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
      res: calc.prevRes,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      neg: !calc.num && value === "-" ?  true : false,
      sign: !calc.num && value === "-" ? calc.sign : value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      prevRes: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
      setCalc({
        ...calc,
        res: calc.res, // why must indicate the value of res is calc.res; if omitted, the calculator will not work
        sign: "",
        num: 0,
      });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
      {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                id={btn.id}
                value={btn.value}
                onClick={
                  btn.value === "AC"
                  ? resetClickHandler
                  : btn.value === "="
                  ? equalsClickHandler
                  : btn.value === "/" || btn.value === "X" || btn.value === "-" || btn.value === "+"
                  ? signClickHandler
                  : btn.value === "."
                  ? commaClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;