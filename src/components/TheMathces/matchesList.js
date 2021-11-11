import React from "react";
import { easePolyOut } from "d3-ease";
import { NodeGroup } from "react-move";
import { Grid, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../UI/Theme";

const useStyles = makeStyles((theme) => ({
  matchBoxBig: {
    borderBottom: "2px solid",
    padding: "20px",
    height: "143px",
    clear: "both",
  },
  icon: {
    width: "50px !important",
    height: "50px !important",
    backgroundSize: "cover !important",
  },
  teamName: {
    fontFamily: "Raleway",
    fontSize: "1.2rem",
    margin: " 0 10px",
    color: `${theme.palette.secondary.main} !important`,
    [theme.breakpoints.down("sm")]: {
      fontSize: ".9rem"
    },
  },
  teamReasult: {
    fontFamily: "Pacifico",
    fontSize: "1.3rem",
  },
  stadiumAnswer: {
    fontFamily: "Raleway",
    fontWeight: 500,
  }
}));

const MatchesList = (props) => {
  const classes = useStyles();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const showMatches = () =>
    props.matches ? (
      <NodeGroup
        data={props.matches}
        keyAccessor={(d) => d.id}
        start={() => ({
          opacity: 0,
          x: -200,
        })}
        enter={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut },
        })}
        update={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut },
        })}
        leave={(d, i) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut },
        })}
      >
        {(node) => (
          <div>
            {node.map(({ key, data, state: { x, opacity } }) => (
              <Grid
                container
                justifyContent="space-between"
                key={key}
                className={classes.matchBoxBig}
                style={{
                  opacity,
                  transform: `translate(${x}px)`,
                }}
              >
                <Grid item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className={classes.icon}
                      style={{
                        background: `url(/images/team_icon/${data.localThmb}.png)`,
                      }}
                    ></div>
                    <div className={classes.teamName}>{data.local}</div>
                    <div className={classes.teamReasult}>
                      {data.resultLocal}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className={classes.icon}
                      style={{
                        background: `url(/images/team_icon/${data.awayThmb}.png)`,
                      }}
                    ></div>
                    <div className={classes.teamName}>{data.away}</div>
                    <div className={classes.teamReasult}>{data.resultAway}</div>
                  </div>
                </Grid>
                <Grid item className="block_wraper nfo">
                  <div className={classes.teamReasult}>
                    <strong className={classes.teamName}>Date:</strong>
                    {data.date}
                  </div>
                  <div className={classes.stadiumAnswer}>
                    <strong className={classes.teamName}>Stadium:</strong>
                    {data.stadium}
                  </div>
                  <div className={classes.stadiumAnswer}>
                    <strong className={classes.teamName}>Referee:</strong>
                    {data.referee}
                  </div>
                </Grid>
              </Grid>
            ))}
          </div>
        )}
      </NodeGroup>
    ) : null;
  return <Grid>{showMatches()}</Grid>;
};

export default MatchesList;
