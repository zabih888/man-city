import { Grid } from "@mui/material";
import React from "react";
import AdminNav from "../components/Admin/nav/AdminNav";

const AdminLayout = (props) => {
  return (
    <Grid container>
      <Grid item xs={4} md={3}>
        <AdminNav />
      </Grid>
      <Grid item xs={8} md={9}>
        <h2>{props.title}</h2>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
