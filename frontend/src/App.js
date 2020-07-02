import React from "react";
import "./App.css";
import axios from "axios";
import Login from "./components/Auth/Login.component";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.component";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header.component";
import { userContext } from "./userContext";

axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      darkState: this.getDarkState.bind(this),
      palletType: this.darkState ? "dark" : "light",
    };
  }
  getDarkState() {
    this.setState({
      darkState: useMediaQuery("(prefers-color-scheme: dark)"),
    });
  }
  setDarkState = (value) => {
    this.setState({
      darkState: value,
    });
  };
  handleThemeChange = () => {
    this.setDarkState(!this.state.darkState);
    this.updatepalletType();
  };
  updatepalletType = () => {
    const palletType = this.state.darkState ? "dark" : "light";
    this.setState({
      palletType: palletType,
    });
  };

  darkTheme = () => {
    return createMuiTheme({
      palette: {
        type: this.state.palletType,
      },
    });
  };

  render() {
    return (
      <userContext.Provider value={this.state.user}>
        <div className="App">
          <ThemeProvider theme={this.darkTheme()}>
            <CssBaseline />
            <Header DarkMode={this.handleThemeChange} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login/" component={Login} />
            </Switch>
          </ThemeProvider>
        </div>
      </userContext.Provider>
    );
  }
}

export default App;
