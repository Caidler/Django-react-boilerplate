import "./SnackBar.styles.css";

import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { alert } from "../../store/actions/";

export default function DefaultSnackbar() {
  const dispatch = useDispatch();
  const alertData = useSelector((state) => state.alert);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(alert.alertClear());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={alertData.open}
        autoHideDuration={alertData.expirationTime}
        onClose={handleClose}
        message={alertData.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
