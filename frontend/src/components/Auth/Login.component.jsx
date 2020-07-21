import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../store/actions/";
import { withRouter } from "react-router-dom";
import { alert } from "../../store/actions/";
import "./Login.styles.css";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(username, password));
    dispatch(alert.alertNormal("Zalogowano", 2));
    props.history.push("/");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          Login
        </Button>
      </form>
    </div>
  );
}

export default withRouter(LoginForm);
