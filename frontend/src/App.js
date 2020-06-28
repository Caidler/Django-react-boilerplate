import React from "react";
import "./App.css";
import axios from "axios";
import Login from "./components/Auth/Login.component";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.component";

function App() {
  // store users in a new variable
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />{" "}
        <Route exact path="/login/" component={Login} />{" "}
      </Switch>
    </div>
  );
}

export default App;
