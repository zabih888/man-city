import React from "react";
import { makeStyles } from "@mui/styles";
import theme from "../UI/Theme";


const useStyles = makeStyles((theme) => ({
  playerCardWrapper: {
    backgroundColor: "#fff",
    border: "2px solid #ececec ",
    padding: "10px 10px 20px 10px",
    
    width: "300px",
    [theme.breakpoints.down("md")]: {
      widht: "220px !important",
    },
    [theme.breakpoints.down("sm")]: {
      widht: "170px !important",
      padding: "5px",
    },
  },
  playerCardThmb: {
    width: "100%",
    height: "250px",
    [theme.breakpoints.down("md")]: {
      height: "170px"
    },
    [theme.breakpoints.down("sm")]: {
      height: "160px"
    },
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
    backgroundSize: "contain !important"
  },
  playerCardNumber: {
    fontSize: "150px",
    fontFamily: "Pacifico",
    textAlign: "right",
    lineHeight: "160px",
    color: `${theme.palette.secondary.main}`
  },
  playerCardName: {
    position: "absolute",
    bottom: "0px",
    fontFamily: "raleway",
    fontWeight: 600,
    color: `${theme.palette.secondary.main}`
  }
}));

const PlayerCard = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.playerCardWrapper}>
      <div
        className={classes.playerCardThmb}
        style={{ background: `#f2f9ff url(${props.bck})` }}
      ></div>
      <div style={{position: 'relative'}}>
        <div className={classes.playerCardNumber}>{props.number}</div>
        <div className={classes.playerCardName}>
          <span style={{display: "block", fontSize: "25px"}}>{props.name}</span>
          <span style={{display: "block", fontSize: "25px"}}>{props.lastName}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
