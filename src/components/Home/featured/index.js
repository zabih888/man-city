import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../UI/Theme";
import Stripes from "./Stirpes";
import Text from "./Text";

const useStyles = makeStyles({
  featuredWrapper: {
    width: "1280px",
    margin: "0 auto",
    marginTop: "90px",
    height: "800px",
    overflow: "hidden !important",
  },
});

const Featured = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.featuredWrapper} >
      <Stripes />
      <Text />
    </Grid>
  );
};

export default Featured;
