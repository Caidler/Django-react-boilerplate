import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Login from "./components/Auth/Login.component";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.component";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header.component";

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
        <Header DarkMode={handleThemeChange} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login/" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
