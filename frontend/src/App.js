import React from "react";
import "./App.css";
import axios from "axios";
import Login from "./components/Auth/Login.component";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.component";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  // store users in a new variable
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={HomePage} />{" "}
          <Route exact path="/login/" component={Login} />{" "}
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
