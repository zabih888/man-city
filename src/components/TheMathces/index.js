import React, { useEffect, useReducer, useState } from "react";
import { showErrorToast } from "../Utils/tools";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { matchesCollection } from "../../firebase";
import LeagueTable from "./tables";
import MatchesList from "./matchesList";
import { makeStyles } from "@mui/styles";
import theme from "../UI/Theme";

const TheMatches = () => {
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [matches, setMatches] = useState(null);
  const [state, dispatch] = useReducer(
    (prevState, nextState) => {
      return { ...prevState, ...nextState };
    },
    {
      filterMatches: null,
      playedFilter: "All",
      resultFilter: "All",
    }
  );

  useEffect(() => {
    if (!matches) {
      matchesCollection
        .get()
        .then((snapshot) => {
          const matches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matches);
          dispatch({ ...state, filterMatches: matches });
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [matches, state]);

  const showPlayed = (played) => {
    //   all yes no
    const list = matches.filter((match) => {
      return match.final === played;
    });

    dispatch({
      ...state,
      filterMatches: played === "All" ? matches : list,
      playedFilter: played,
      resultFilter: "All",
    });
  };

  const showResult = (result) => {
    const list = matches.filter((match) => {
      return match.result === result;
    });

    dispatch({
      ...state,
      filterMatches: result === "All" ? matches : list,
      playedFilter: "All",
      resultFilter: result,
    });
  };

  return (
    <>
      <div style={{ marginTop: matchesMD ? "4rem" : "5rem" }} />
      <Grid container style={{minHeight: "100vh"}}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #01285e",
              background: "#dff1ff",
              padding: "3rem 1rem 1rem 1rem  ",
            }}
          >
            <Grid>
              <div
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "500",
                  color: "#656565",
                  marginBottom: "5px",
                  fontSize: "1.2rem"
                }}
              >
                Show Matches
              </div>
              <div style={{ display: "flex" }}>
                <div
                  className={`option ${
                    state.playedFilter === "All" ? "active" : ""
                  }`}
                  onClick={() => showPlayed("All")}
                >
                  All
                </div>
                <div
                  className={`option ${
                    state.playedFilter === "yes" ? "active" : ""
                  }`}
                  onClick={() => showPlayed("yes")}
                >
                  Played
                </div>
                <div
                  className={`option ${
                    state.playedFilter === "no" ? "active" : ""
                  }`}
                  onClick={() => showPlayed("no")}
                >
                  Not Played
                </div>
              </div>
            </Grid>
            <Grid>
              <div
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "500",
                  color: "#656565",
                  marginBottom: "5px",
                  fontSize: "1.2rem"
                }}
              >
                Result games
              </div>
              <div style={{ display: "flex" }}>
                <div
                  className={`option ${
                    state.resultFilter === "All" ? "active" : ""
                  }`}
                  onClick={() => showResult("All")}
                >
                  All
                </div>
                <div
                  className={`option ${
                    state.resultFilter === "W" ? "active" : ""
                  }`}
                  onClick={() => showResult("W")}
                >
                  W
                </div>
                <div
                  className={`option ${
                    state.resultFilter === "L" ? "active" : ""
                  }`}
                  onClick={() => showResult("L")}
                >
                  L
                </div>
                <div
                  className={`option ${
                    state.resultFilter === "D" ? "active" : ""
                  }`}
                  onClick={() => showResult("D")}
                >
                  D
                </div>
              </div>
            </Grid>
          </div>
        </Grid>

        <Grid item container>
          <Grid item xs={12} md={6}>
            <MatchesList matches={state.filterMatches} />
          </Grid>

          <Grid item xs={12} md={6}>
            <LeagueTable />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TheMatches;
