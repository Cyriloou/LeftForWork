import React, { Component } from "react";
import "./App.css";
import LeftforworkForm from "./Formik/LeftforworkForm";
import { Container } from "@material-ui/core";
import Parse from "parse";

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
  render() {
    return (
      <div className="App">
        <Container maxWidth="sm">
          <LeftforworkForm />
        </Container>
      </div>
    );
  }
}

export default App;
