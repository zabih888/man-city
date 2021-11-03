// import { useTheme } from '@emotion/react'
import React from "react";
import Featured from "./featured";
import MatchesHome from "./matches";

const Home = () => {
  return (
    <div>
      <div style={{ background: "#0d1831", overflowX: "hidden" }}>
        <Featured />
      </div>
      <MatchesHome />
    </div>
  );
};

export default Home;
