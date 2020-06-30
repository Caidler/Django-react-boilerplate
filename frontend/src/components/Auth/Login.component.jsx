import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function Login() {
  const [username, setUsername] = useState;
  const [password, setPassword] = useState;
  const [email, setEmail] = useState;

  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/accounts/login/", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
        />
        <TextField
          id="email"
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
