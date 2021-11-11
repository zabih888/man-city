import React from "react";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as LinkR } from "react-router-dom";
import { Link } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    padding: "2rem 0 1rem 0",
  },
  icon: {
    color: `${theme.palette.secondary.main} !important`,
    border: "1px solid",
    borderColor: `${theme.palette.secondary.main} !important`,
    borderRadius: "50%",
    padding: "10px",
    margin: "10px 15px",
    cursor: "pointer"
  },
  linkFooter: {
    color: `${theme.palette.secondary.main} !important`,
    fontFamily: "Raleway",
    fontSize: "1rem",
    fontWeight: "600",
    margin: "10px 20px !important",
    [theme.breakpoints.down("sm")]: {
        margin: "10px !important"
      },
    cursor: "pointer"
  },
  copyRight: {
    color: `${theme.palette.secondary.light} !important`,
    fontFamily: "Raleway",
    fontSize: "1rem",
    fontWeight: "600",
    margin: "20px !important"
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.footerContainer} justifyContent="center" textAlign="center">
      <Grid item container justifyContent="center">
        <Facebook className={classes.icon} />
        <Instagram className={classes.icon} />
        <Twitter className={classes.icon} />
        <YouTube className={classes.icon} />
      </Grid>

      <Grid item container justifyContent="center">
        <Link component={LinkR} to="/" className={classes.linkFooter}>Home</Link>
        <Link component={LinkR} to="/the_matches" className={classes.linkFooter}>Matches</Link>
        <Link component={LinkR} to="/players" className={classes.linkFooter}>Players</Link>
        <Link component={LinkR} to="/dashboard" className={classes.linkFooter}>DashBoard</Link>
      </Grid>
      <Grid item className={classes.copyRight}>
        Manchester city 2021.All rights reserved
      </Grid>
    </Grid>
  );
};

export default Footer;
