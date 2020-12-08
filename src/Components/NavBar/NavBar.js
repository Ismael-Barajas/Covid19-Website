import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import img from "../../images/covidCounties.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    margin: 5,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <nav>
      <div className={styles.nav}>
        <AppBar
          position="static"
          style={{ backgroundImage: "linear-gradient(rgb(242, 140, 133),  rgba(255, 158, 158, 0.398))", backgroundColor: "transparent", color: "black" }}
        >
          <div className={styles.title}>
            <Typography variant="h6">
              <img src={img} className={styles.rotatingimg} alt="covid" />
              COVID-19 Watch
            </Typography>
          </div>
          <div className={styles.buttons}>
            <Toolbar variant="dense">
              <Button
                component={Link}
                to="/"
                variant="outlined"
                className={classes.title}
                color="inherit"
              >
                HOME
              </Button>
              <Button
                component={Link}
                to="/graphs"
                variant="outlined"
                className={classes.title}
                color="inherit"
              >
                GRAPHS
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                className={classes.title}
                color="inherit"
              >
                ABOUT
              </Button>
            </Toolbar>
          </div>
        </AppBar>
      </div>
    </nav>
  );
};

export default NavBar;
