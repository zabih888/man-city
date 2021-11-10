import { Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import AdminNav from "../components/Admin/nav/AdminNav";
import theme from "../components/UI/Theme";

const AdminLayout = ({title, children}) => {
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container>
      <Grid item>
        <AdminNav />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          marginLeft: matchesMD ? "1.5rem" : "10rem",
          marginRight: matchesMD ? "1.5rem" : "0rem",
          marginTop: matchesMD ? "9rem" : "8rem",
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontSize: "2.5rem",
            fontFamily: "Raleway",
            color: `${theme.palette.secondary.main}`,
          }}
        >
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
