import "./Login.styles.css";

import { Link, withRouter } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { authLogin } from "../../store/actions/";
import { makeStyles } from "@material-ui/core/styles";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(username, password));
    props.history.push("/");
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: "8px",
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: "8px",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className="username-field"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address/Username"
            name="email"
            autoComplete="email"
            autoFocus
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="password-field"
            id="password"
            label="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            type="password"
          />
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
            Login
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default withRouter(LoginForm);
