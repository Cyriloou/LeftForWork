import React, { Component } from "react";
import "./App.css";
import LeftforworkForm from "./Formik/LeftforworkForm";
import Parse from "parse";
import { scroller } from "react-scroll";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// use default theme
// const theme = createMuiTheme();

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2538a6"
    }
  }
});

export class App extends Component {
  constructor(props) {
    super(props);
    Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
    // Parse.initialize(
    //   process.env.REACT_APP_BACK4APP_APP_ID,
    //   process.env.REACT_APP_BACK4APP_JS_KEY
    // );
    Parse.initialize(
      "oqePRxeb0BbsPnbYI3NkNfwAuCS6xC2BIJ6CEX3j",
      "Kd8GvZVXq5ScD6ZLxPVNucDgU4QL9LPUV0klIi1Z"
    );
  }

  componentDidMount() {
    scroller.scrollTo("Logo", {
      duration: 800,
      delay: 80,
      smooth: true
    });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <LeftforworkForm />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
