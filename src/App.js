import React from "react";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  //handling input
  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };
  //operating
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };
  //viewing result
  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };
  //delete function
  const back = () => {
    if (!curState) return;
    if (curState?.length >= 2 && curState.charAt(curState.length - 2) === ".")
      setCurState(curState.slice(0, -2));
    else if (
      curState?.length >= 2 &&
      curState.charAt(curState.length - 1) === "."
    ) {
      setCurState((pre) => pre.slice(0, -2));
    } else if (curState?.length === 2 && curState.charAt(0) === "-")
      setCurState("");
    else setCurState((pre) => pre.slice(0, -1));
  };
  //clearing function
  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  return (
    <div className="container">
      <div className="calculator">
        <div className="result">
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="keypad">
          <button onClick={reset}>C</button>
          <button onClick={operatorType}>/</button>
          <button onClick={operatorType}>x</button>
          <button onClick={back}>del</button>
          <button onClick={inputNum}>7</button>
          <button onClick={inputNum}>8</button>
          <button onClick={inputNum}>9</button>
          <button onClick={operatorType}>-</button>
          <button onClick={inputNum}>4</button>
          <button onClick={inputNum}>5</button>
          <button onClick={inputNum}>6</button>
          <button onClick={operatorType}>+</button>
          <button onClick={inputNum}>1</button>
          <button onClick={inputNum}>2</button>
          <button onClick={inputNum}>3</button>
          <button onClick={minusPlus}>+/-</button>
          <button onClick={equals}>=</button>
          <button onClick={percent}>%</button>
          <button onClick={inputNum}>0</button>
          <button onClick={inputNum}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
