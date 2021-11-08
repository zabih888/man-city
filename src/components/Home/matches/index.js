import { Grid, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../UI/Theme";
import Blocks from "./Blocks";

const useStyles = makeStyles((theme) => ({
  topMatchesTitle: {
    color: `${theme.palette.common.white} !important`,
    fontSize: "4rem !important",
    paddingTop: "1rem !important",
    paddingLeft: "11rem",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "8rem",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "2rem",
    },
  },
}));

const MatchesHome = () => {
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        minHeight: "800px",
        backgroundColor: `${theme.palette.primary.main}`,
        paddingBottom: "4rem"
      }}
    >
      <div
        style={{
          backgroundColor: matchesSM
            ?null
            : `${theme.palette.secondary.main}`,
          height: matchesSM ? "1rem" : "3rem",
        }}
      ></div>
      <Typography variant="h1" className={classes.topMatchesTitle}> Matches</Typography>
      <Blocks />
      {/* <Typography style={{ textAlign: "center" }} variant="h4">
        matches
      </Typography> */}
    </div>
  );
};

export default MatchesHome;
