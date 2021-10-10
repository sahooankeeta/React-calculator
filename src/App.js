import React from "react";
import Keypad from "./Keypad";
import Result from "./Result";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      result: "",
    };
  }
  onClick = (button) => {
    let op = ["/", "*", "+", "-"];
    if (button === "=") {
      this.calculate();
    } else if (button === "C") {
      this.reset();
    } else if (button === "del") {
      this.backspace();
    } else {
      let c = this.state.result.slice(-1);

      if ((c == "*" && button == "/") || (c == "/" && button == "*")) {
        console.log(c);
        //this.backspace();
        this.setState({
          result: this.state.result.slice(0, -1) + button,
        });
      } else if (
        !(op.indexOf(c) != -1 && button == c) &&
        !(this.state.result == "" && (button == "/" || button == "*"))
      )
        this.setState({
          result: this.state.result + button,
        });
    }
    // console.log(this.state.result);
  };

  calculate = () => {
    try {
      this.setState({
        result: (eval(this.state.result) || "") + "",
      });
    } catch (e) {
      this.setState({
        result: "error",
      });
    }
  };
  reset = () => {
    this.setState({
      result: "",
    });
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1),
    });
  };
  render() {
    return (
      <div className="container">
        <div className="calculator">
          <Result result={this.state.result} />
          <Keypad onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default App;
