import { Grid, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import theme from "../UI/Theme";

const useStyles = makeStyles((theme) => ({
  resultNumber: {
    fontFamily: "Pacifico",
    fontWeight: 600,
    fontSize: "2rem",
    color: `${theme.palette.secondary.main}`,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.7rem",
    },
  },
  date: {
    fontFamily: "Pacifico",
    fontWeight: 600,
    fontSize: "1.2rem",
    color: `${theme.palette.secondary.main}`,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  nameTeams: {
    fontFamily: "Pacifico",
    fontWeight: 500,
    color: `${theme.palette.secondary.main}`,
    fontSize: "1.3rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
}));

const MatchesBlock = ({ match }) => {
  const classes = useStyles();
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      textAlign="center"
      item
      style={{ display: "flex", background: "#fff", margin: "1rem" , boxShadow: "0px 10px 13px -10px #000000"}}
    >
      <Grid container justifyContent="space-evenly">
        <Grid item container justifyContent="flex-end" xs={3.5}>
          <Grid item>
            <div
              style={{
                background: `url(/images/team_icon/${match.localThmb}.png)`,
                height: matchesMD ? "75px" : matchesLG ? "90px" : "100px",
                width: matchesMD ? "75px" : matchesLG ? "90px" : "100px",
                backgroundSize: "cover",
              }}
            />
            <div className={classes.nameTeams}>{match.local}</div>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.date}>{match.date}</div>
          <h1 className={classes.resultNumber}>
            {match.final ? match.resultLocal : "-"}
            {"-"}
            {match.final ? match.resultAway : "-"}
          </h1>
        </Grid>
        <Grid item container xs={3.5}>
          <Grid item>
            <div
              style={{
                background: `url(/images/team_icon/${match.awayThmb}.png)`,
                height: matchesMD ? "75px" : matchesLG ? "90px" : "100px",
                width: matchesMD ? "75px" : matchesLG ? "90px" : "100px",
                backgroundSize: "cover",
              }}
            />
            <div className={classes.nameTeams}>{match.away}</div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MatchesBlock;
