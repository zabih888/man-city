import { useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { matchesCollection } from "../../../firebase";
import theme from "../../UI/Theme";
import MatchesBlock from "../../Utils/matches_block";

const Blocks = () => {
  const [matches, setMatches] = useState([]);
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!matches.length > 0) {
      matchesCollection
        .get()
        .then((snapshot) => {
          const matches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matches);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matches]);

  const showMatches = () =>
    matches
      ? matches.map((match) => (
          <Slide
            bottom
            key={match.id}
            style={{ width: matchesSM ? "100%" : "50%" }}
            triggerOnce
          >
            <div>
              <div style={{ display: "flex" }}>
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: matchesMD
          ? "2rem 1rem "
          : matchesLG
          ? "2rem 7rem "
          : "2rem 10rem",
      }}
    >
      {showMatches(matches)}
    </div>
  );
};

export default Blocks;
