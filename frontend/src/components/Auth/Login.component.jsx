import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { userActions } from "../_actions";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { username, email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className="from-wrapper">
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          value={username}
          onChange={handleChange}
          required
          type="text"
        />
        <TextField
          id="email"
          label="email"
          variant="outlined"
          value={email}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          value={password}
          onChange={handleChange}
          required
          type="password"
        />
        <Button variant="contained" color="primary" type="submit">
          {loggingIn && <CircularProgress />}
          Login
        </Button>
        <Link to="/register" className="btn btn-link">
          Register
        </Link>
      </form>
    </div>
  );
}
