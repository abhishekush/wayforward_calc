import React, { useState } from "react";
import "./App.css";

// anant.s@wayforward.io

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const BUTTON_COLOR = "rgb(152, 138, 138)";
const INVERSE_COLOR = "#ffff";

const Button = ({ children, handlePress, operator = false }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      borderWidth: 1,
      borderColor: operator ? INVERSE_COLOR : BUTTON_COLOR,
      borderStyle: "solid",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      color: operator ? INVERSE_COLOR : "#000",
      backgroundColor: operator ? BUTTON_COLOR : INVERSE_COLOR,
    }}
    onClick={handlePress(children)}
  >
    <p>{children}</p>
  </div>
);

function App() {
  const [charArray, setCharArray] = useState(["0"]);

  const [result, setResult] = useState(0);

  const buttonPress = (char) => () => {
    if (char !== "=") {
      if (isNumeric(Number(char)) || char === ".") {
        if (isNumeric(Number(charArray[charArray.length - 1]))) {
          setCharArray((arr) => [
            ...arr.slice(0, arr.length - 1),
            `${arr[arr.length - 1]}${char}`,
          ]);
        } else {
          setCharArray((prevArr) => [...prevArr, char]);
        }
      } else {
        console.log("CHAR: ", char);
        setCharArray((prevArr) => [...prevArr, char]);
      }
    } else {
      let operators = [];
      const newResult = charArray.reduce((acc, current) => {
        if (isNumeric(Number(current))) {
          if (operators.length > 0) {
            switch (operators[0]) {
              case "+":
                operators = operators.slice(1, operators.length);
                return acc + Number(current);
              case "-":
                operators = operators.slice(1, operators.length);
                return acc - Number(current);
              case "/":
                operators = operators.slice(1, operators.length);
                return acc / Number(current);
              case "X":
                operators = operators.slice(1, operators.length);
                return acc * Number(current);
              default:
                return acc;
            }
          } else {
            return acc + Number(current);
          }
        } else {
          operators.push(current);
        }
        return acc;
      }, 0);

      setResult(newResult);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: 100,
          backgroundColor: "#ffc0c0",
        }}
      >
        <div>{charArray.join("")}</div>
        <br />
        <div style={{ display: "flex" }}> {result}</div>
      </div>
      <div style={{ display: "flex" }}>
        <Button handlePress={buttonPress}>7</Button>
        <Button handlePress={buttonPress}>8</Button>
        <Button handlePress={buttonPress}>9</Button>
        <Button operator handlePress={buttonPress}>
          X
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <Button handlePress={buttonPress}>4</Button>
        <Button handlePress={buttonPress}>5</Button>
        <Button handlePress={buttonPress}>6</Button>
        <Button operator handlePress={buttonPress}>
          -
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <Button handlePress={buttonPress}>1</Button>
        <Button handlePress={buttonPress}>2</Button>
        <Button handlePress={buttonPress}>3</Button>
        <Button operator handlePress={buttonPress}>
          +
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <Button handlePress={buttonPress}>0</Button>
        <Button handlePress={buttonPress}>.</Button>
        <Button operator handlePress={buttonPress}>
          =
        </Button>
        <Button operator handlePress={buttonPress}>
          /
        </Button>
      </div>
    </div>
  );
}

export default App;
