import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import { makeStyles } from "@mui/styles";
import { Grid, useMediaQuery } from "@mui/material";
import theme from "../../UI/Theme";

let stripesState = [
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 120,
    rotate: 25,
    top: -260,
    delay: 0,
  },
  {
    id: Math.random(),
    background: `${theme.palette.common.white}`,
    left: 360,
    rotate: 25,
    top: -397,
    delay: 200,
  },
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 600,
    rotate: 25,
    top: -498,
    delay: 400,
  },
];
let stripesStateMd = [
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 60,
    rotate: 20,
    top: -150,
    delay: 0,
  },
  {
    id: Math.random(),
    background: `${theme.palette.common.white}`,
    left: 220,
    rotate: 20,
    top: -218,
    delay: 200,
  },
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 380,
    rotate: 20,
    top: -310,
    delay: 400,
  },
];
let stripesStateSM = [
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 26,
    rotate: 15,
    top: -150,
    delay: 0,
  },
  {
    id: Math.random(),
    background: `${theme.palette.secondary.main}`,
    left: 160,
    rotate: 15,
    top: -218,
    delay: 200,
  },
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 293,
    rotate: 15,
    top: -310,
    delay: 400,
  },
];
let stripesStateXS = [
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 0,
    rotate: 0,
    top: -150,
    delay: 0,
  },
  {
    id: Math.random(),
    background: `${theme.palette.common.white}`,
    left: 109,
    rotate: 0,
    top: -218,
    delay: 200,
  },
  {
    id: Math.random(),
    background: `${theme.palette.primary.main}`,
    left: 218,
    rotate: 0,
    top: -310,
    delay: 400,
  },
];

const useStyles = makeStyles({
  featuredStripes: {
    position: "relative",
  },
  stripe: {
    width: "230px",
    height: "1200px",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      width: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "127px",
    },
    [theme.breakpoints.only("xs")]: {
      width: "104px",
    },
  },
});
const Stipes = () => {
  const classes = useStyles();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const handleShowStripe = () =>
    matchesXS
      ? stripesStateXS.map((stripe) => (
          <Animate
            key={stripe.id}
            show={true}
            start={{
              background: "#ffffff",
              opacity: 0,
              left: 0,
              rotate: 0,
              top: 0,
            }}
            enter={{
              background: `${stripe.background}`,
              opacity: [1],
              left: [stripe.left],
              rotate: [stripe.rotate],
              top: [stripe.top],
              timing: {
                delay: stripe.delay,
                duration: 200,
                ease: easePolyOut,
              },
            }}
          >
            {({ background, opacity, left, rotate, top }) => (
              <div
                className={classes.stripe}
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
                }}
              ></div>
            )}
          </Animate>
        ))
      : matchesSM
      ? stripesStateSM.map((stripe) => (
          <Animate
            key={stripe.id}
            show={true}
            start={{
              background: "#ffffff",
              opacity: 0,
              left: 0,
              rotate: 0,
              top: 0,
            }}
            enter={{
              background: `${stripe.background}`,
              opacity: [1],
              left: [stripe.left],
              rotate: [stripe.rotate],
              top: [stripe.top],
              timing: {
                delay: stripe.delay,
                duration: 200,
                ease: easePolyOut,
              },
            }}
          >
            {({ background, opacity, left, rotate, top }) => (
              <div
                className={classes.stripe}
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
                }}
              ></div>
            )}
          </Animate>
        ))
      : matchesMD
      ? stripesStateMd.map((stripe) => (
          <Animate
            key={stripe.id}
            show={true}
            start={{
              background: "#ffffff",
              opacity: 0,
              left: 0,
              rotate: 0,
              top: 0,
            }}
            enter={{
              background: `${stripe.background}`,
              opacity: [1],
              left: [stripe.left],
              rotate: [stripe.rotate],
              top: [stripe.top],
              timing: {
                delay: stripe.delay,
                duration: 200,
                ease: easePolyOut,
              },
            }}
          >
            {({ background, opacity, left, rotate, top }) => (
              <div
                className={classes.stripe}
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
                }}
              ></div>
            )}
          </Animate>
        ))
      : stripesState.map((stripe) => (
          <Animate
            key={stripe.id}
            show={true}
            start={{
              background: "#ffffff",
              opacity: 0,
              left: 0,
              rotate: 0,
              top: 0,
            }}
            enter={{
              background: `${stripe.background}`,
              opacity: [1],
              left: [stripe.left],
              rotate: [stripe.rotate],
              top: [stripe.top],
              timing: {
                delay: stripe.delay,
                duration: 200,
                ease: easePolyOut,
              },
            }}
          >
            {({ background, opacity, left, rotate, top }) => (
              <div
                className={classes.stripe}
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
                }}
              ></div>
            )}
          </Animate>
        ));
  return <div className={classes.featuredStripes}>{handleShowStripe()}</div>;
};

export default Stipes;
