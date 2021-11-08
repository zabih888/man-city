// import { useTheme } from '@emotion/react'
import React from "react";
import Featured from "./featured";
import MatchesHome from "./matches";
import MeetPlayers from "./meetPlayers";
import Promotion from "./promotion";

const Home = () => {
  return (
    <div>
      <div style={{ background: "#0d1831", overflowX: "hidden" }}>
        <Featured />
      </div>
      <MatchesHome />
      <Promotion />
      <MeetPlayers />
    </div>
  );
};

export default Home;
