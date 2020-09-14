import "./Header.styles.scss";

import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Button from "@material-ui/core/Button";
import DefaultSnackbar from "../Snackbar/Snackbar.component";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../../assets/logo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { alert } from "../../store/actions/";
import { logout } from "../../store/actions/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // menuSwitch: {
  //   marginRight: theme.spacing(2),
  //   flexGrow: 1,
  // },
  title: {
    flexGrow: 1,
  },
}));

function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const alertOpened = useSelector((state) => state.alert.open);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    props.history.push("/");
    dispatch(alert.alertNormal("Wylogowano", 2));
  };

  return (
    <div className={classes.root}>
      <AppBar
        className="appbar-container"
        position="static"
        color="transparent"
        elevation={0}
      >
        <Toolbar>
          <Link className="logo-container" to="/">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
          </Link>
          <Typography variant="h6" className={classes.title}></Typography>
          <FormControlLabel
            className={classes.menuSwitch}
            value="start"
            control={<Switch onChange={props.DarkMode} />}
            label={<Brightness2Icon />}
            labelPlacement="start"
            id="dark-mode-switch"
          />
          {!authenticated && (
            <Link className="logo-container" to="/login">
              <Button variant="contained" color="primary">
                Sign In
              </Button>
            </Link>
          )}
          {authenticated && (
            <React.Fragment>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="small"
                className="menu-appbar-icon-container"
              >
                <AccountCircle className="menu-appbar-icon" />
              </IconButton>
              <Menu
                className="profile-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem className="my-profile-menu" onClick={handleClose}>
                  My Profile
                </MenuItem>
                <MenuItem
                  className="logout-profile-menu"
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {alertOpened && <DefaultSnackbar />}
    </div>
  );
}

export default withRouter(MenuAppBar);
