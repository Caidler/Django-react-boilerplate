import "./Copyright.styles.scss";

import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Copyright() {
  return (
    <div className="App-Copyright">
      <Typography color="textSecondary">
        {"Delivered with 💚 by "}
        <Link color="initial" href="https://github.com/Caidler/">
          Caidler
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
