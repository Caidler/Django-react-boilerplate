import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Switch from "@material-ui/core/Switch";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/";
import { withRouter, Link } from "react-router-dom";
import DefaultSnackbar from "../Snackbar/SnackBar.component";
import "./Header.styles.css";
import Logo from "../../assets/logo.svg";
import { alert } from "../../store/actions/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
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

  // const switchDarkMode = () => {
  //   console.log();
  // };

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
          <Typography variant="h6" className={classes.title}>
            OOOOO MY SEKSI PAPI
          </Typography>
          <FormControlLabel
            value="start"
            control={<Switch onChange={props.DarkMode} />}
            label={<Brightness2Icon />}
            labelPlacement="start"
          />
          {authenticated && (
            <React.Fragment>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
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
