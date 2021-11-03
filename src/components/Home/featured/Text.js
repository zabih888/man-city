import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import FeaturedPlayer from "../../images/main/featured_player.png";
import { makeStyles } from "@mui/styles";
import theme from "../../UI/Theme";
import { useMediaQuery } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  featuredFirst: {
    ...theme.typography.homeText,
    [theme.breakpoints.down("lg")]: {
      fontSize: "80px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "50px",
    },
  },
  featuredSecond: {
    ...theme.typography.homeText,
    [theme.breakpoints.down("lg")]: {
      fontSize: "80px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
    },
  },
  featuredPlayer: {
    width: "500px ",
    height: "500px",
    position: "absolute",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "contain !important",
    [theme.breakpoints.down("md")]: {
      width: "400px ",
      height: "400px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "360px ",
      height: "360px",
    },
  },
  featuredText: {
    position: "relative",
  },
  featuredNumber: {
    fontFamily: "Pacifico",
    fontSize: "270px",
    color: `${theme.palette.common.white}`,
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
const Text = () => {
  const classes = useStyles();
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0,
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut },
      }}
    >
      {({ opacity, rotate }) => (
        <div
          className={classes.featuredNumber}
          style={{
            opacity,
            transform: matchesMD
              ? `translate(60px,70px) rotateY(${rotate}deg)`
              : matchesLG
              ? `translate(160px,70px) rotateY(${rotate}deg)`
              : `translate(260px,70px) rotateY(${rotate}deg)`,
          }}
        >
          6
        </div>
      )}
    </Animate>
  );

  const animateFirstText = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 504,
        xM: 504,
        xL: 540,
        xS: 540,
        y: 450,
      }}
      enter={{
        opacity: [1],
        x: [273],
        xM: [35],
        xL: [173],
        xS: [10],
        y: [450],
        timing: { duration: 500, ease: easePolyOut },
      }}
    >
      {({ opacity, x, y, xM, xL, xS }) => (
        <div
          className={classes.featuredFirst}
          style={{
            opacity,
            transform: `translate(${
              matchesSM ? xS : matchesMD ? xM : matchesLG ? xL : x
            }px,${y}px)`,
          }}
        >
          League
        </div>
      )}
    </Animate>
  );

  const animateSecondText = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 504,
        xM: 504,
        xL: 504,
        xS: 504,
        y: 586,
        yM: 586,
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [586],
        xS: [10],
        xM: [35],
        yM: [530],
        xL: [173],
        timing: { delay: 300, duration: 500, ease: easePolyOut },
      }}
    >
      {({ opacity, x, y, xM, yM, xL, xS }) => (
        <div
          className={classes.featuredSecond}
          style={{
            opacity,
            transform: `translate(${
              matchesSM ? xS : matchesMD ? xM : matchesLG ? xL : x
            }px,${matchesMD ? yM : y}px)`,
          }}
        >
          Chanmpionships
        </div>
      )}
    </Animate>
  );

  const animatePlayer = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
      }}
      enter={{
        opacity: [1],
        timing: { delay: 800, duration: 500, ease: easePolyOut },
      }}
    >
      {({ opacity }) => (
        <div
          className={classes.featuredPlayer}
          style={{
            opacity,
            background: `url(${FeaturedPlayer})`,
            transform: matchesSM
              ? "translate(10px, 201px)"
              : matchesMD
              ? "translate(200px, 201px)"
              : matchesLG
              ? "translate(420px, 201px)"
              : "translate(550px, 201px)",
          }}
        ></div>
      )}
    </Animate>
  );
  return (
    <div className={classes.featuredText}>
      {animatePlayer()}
      {animateNumber()}
      {animateFirstText()}
      {animateSecondText()}
    </div>
  );
};

export default Text;
