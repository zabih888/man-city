import React, { useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fade } from "react-awesome-reveal";
import theme from "../../UI/Theme";
import HomeCards from "./cards";

const useStyles = makeStyles((theme) => ({
  text: {
    background: `${theme.palette.secondary.main}`,
    width: "300px",
    padding: "1rem 2rem",
    marginBottom: "3rem !important",
    marginTop: "2rem !important",
    fontSize: "70px !important",
    [theme.breakpoints.down("lg")]: {
      width: "160px",
      fontSize: "45px !important",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "30px !important",
      marginBottom: "4rem !important",
      width: "100px",
    },
  },
  textContainer: {
    marginRight: "11rem",
    [theme.breakpoints.down("lg")]: {
      marginRight: "8rem",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "2rem",
    },
  },
}));

const MeetPlayers = () => {
  const classes = useStyles();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [show, setShow] = useState(false);
  return (
    <Fade
      triggerOnce
      onVisibilityChange={(inView) => {
        if (inView) {
          setShow(true);
        }
      }}
    >
      <div className="home_meetplayers">
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              height: matchesMD ? "500px" : "620px",
              width:  matchesMD ? "500px" : "620px",
              position: "relative",
              paddingLeft: "5rem",
            }}
          >
            <HomeCards show={show} />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={6}
            style={{
              background: matchesSM
                ? `${theme.palette.secondary.main}`
                : undefined,
            }}
          >
            <Grid
              container
              justifyContent={matchesSM ? null : "flex-end"}
              className={classes.textContainer}
            >
              {matchesSM ? (
                <Grid container >
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.text}>
                      Meet
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.text}>
                      The
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.text}>
                      Players
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.text}>
                      Teams
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <div>
                  <Grid item>
                    <Typography variant="h4" className={classes.text}>
                      Meet
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.text}>
                      The
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.text}>
                      Players
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.text}>
                      Teams
                    </Typography>
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default MeetPlayers;
