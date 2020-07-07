import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Auth/Login.component";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.component";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header.component";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.component";
import { useSelector } from "react-redux";
import { history } from "./components/_helpers";
// import ShowSnackbar from "./components/Snackbar/Snackbar.component"
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

function App() {
  // store users in a new variable
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
  const alert = useSelector((state) => state.alert);
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);

  const vertical = 'bottom';
  const horizontal = 'center';
  const [open, setOpen] = React.useState({
      open: false,
  });
  const closeSnackbar = () => {
      setOpen(false);
  };

  useEffect(() => {
      setOpen(true);
  }, [alert])


  return (
    <div className="App">
      { alert.message && (<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={alert.message}
          onClose={closeSnackbar}
          key={vertical + horizontal}
          autoHideDuration={6000}
          action={
              <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                  <CloseIcon fontSize="small" />
              </IconButton>
              </React.Fragment>
          }
      />)} 
      
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header DarkMode={handleThemeChange} isLoggedIn={isLoggedIn} />
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login/" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
