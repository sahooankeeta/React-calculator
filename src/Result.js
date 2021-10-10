import React from "react";
class Result extends React.Component {
  render() {
    let { result } = this.props;

    return <div className="result">{result}</div>;
  }
}
export default Result;
