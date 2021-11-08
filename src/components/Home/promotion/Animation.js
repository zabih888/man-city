import { Grid, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Zoom } from "react-awesome-reveal";
import jersey from "../../../images/main/jersey.jpg";
import theme from "../../UI/Theme";
const useStyles = makeStyles((theme) => ({
  text: {
    color: `${theme.palette.secondary.main} !important`,
    fontSize: "80px !important",
    marginLeft: "11rem !important",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "8rem !important",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "3rem !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0rem !important",
      textAlign: "center",
      margin: "1rem 0 !important",
    },
  },
  containerImg: {
    width: "350px !important",
    height: "500px !important",
    backgroundSize: "cover !important",
    backgroundPosition: "center !important",
    backgroundImage: `url(${jersey})`,
    marginRight: "11rem ",
    [theme.breakpoints.down("lg")]: {
      marginRight: "8rem !important",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "3rem !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "0rem !important",
      marginBottom: "2rem",
    },
  },
}));

const Animation = () => {
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={12} md={6}>
        <Zoom triggerOnce>
          <Typography variant="h1" className={classes.text}>
            Win
          </Typography>
          <Typography variant="h1" className={classes.text}>
            Jersey
          </Typography>
        </Zoom>
      </Grid>
      <Grid item xs={12} md={6}>
        <Zoom triggerOnce>
          <Grid container justifyContent={matchesSM ? "center" : "flex-end"}>
            <div className={classes.containerImg} />
          </Grid>
        </Zoom>
      </Grid>
    </Grid>
  );
};

export default Animation;
