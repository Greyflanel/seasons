import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner"

class App extends React.Component {
//   constructor(props) {
//     super(props);
    //*** This is the only time we directly assign this.state***//
//     this.state = { lat: null, errorMessage: "" };
//   }
   // ***This is equivalent to the entire constructor function!***
  state = { lat: null, errorMessage: '' }

  // A perfect location to do some data loading or starting some outside process, like getting user location
  // If you only have to do it one time!
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      //we did not do this!!!:
      // this.setState.lat = position.latitude //
      err => this.setState({ errorMessage: err.message })
    );
  }
  // Avoid doing anything besides returning JSX inside render method!!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage} </div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <Spinner message="Please accept location request" />;
  };
};

ReactDom.render(<App />, document.querySelector("#root"));
