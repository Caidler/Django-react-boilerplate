import "./App.css";

import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Copyright from "./components/Copyright/Copyright.component";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header.component";
import HomePage from "./components/HomePage/HomePage.component";
import Login from "./components/Auth/Login.component";
import Register from "./components/Auth/register.component";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const [darkState, setDarkState] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header DarkMode={handleThemeChange} />{" "}
        <Switch>
          <Route exact path="/" component={HomePage} />{" "}
          <Route exact path="/login/" component={Login} />{" "}
          <Route exact path="/register/" component={Register} />{" "}
          <Redirect from="*" to="/" />
        </Switch>{" "}
      </ThemeProvider>{" "}
      <Copyright />
    </div>
  );
}

export default App;
