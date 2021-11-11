import { Grid } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <div style={{ marginTop: "10rem" }}>
      <Grid container direction="column"  textAlign="center" >
        <Grid item style={{
          fontFamily: "Pacifico",
          fontWeight: 800,
          fontSize: "10rem",
          color: "#0d1831",
        }}>404</Grid>
        <Grid item container direction="column">
          <Grid item style={{fontFamily: "Raleway", fontWeight: 600, lineHeight: 2, color: "#0d1831"}}>SORRY, CITY FANS!</Grid>
          <Grid item style={{fontFamily: "Raleway", fontWeight: 600, lineHeight: 2, color: "#0d1831"}}>We can't seem to find the page you're after.</Grid>
          <Grid item style={{fontFamily: "Raleway", fontWeight: 600, lineHeight: 2, color: "#0d1831"}}>Please check the link and try again</Grid>
          <div style={{marginBottom: "17rem"}} />
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
