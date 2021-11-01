import { Grid } from "@mui/material";
import React from "react";
import AdminNav from "../components/Admin/nav/AdminNav";

const AdminLayout = (props) => {
  return (
    <Grid container>
      <Grid item>
        <AdminNav />
      </Grid>
      <Grid>
        <h2>{props.title}</h2>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
