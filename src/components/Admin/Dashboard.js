import { Typography } from "@mui/material";
import React from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import theme from "../UI/Theme";

const Dashboard = (props) => {
  return (
    <AdminLayout>
      <div style={{ marginTop: "10rem" }} />
      <Typography
        variant="h2"
        style={{
          fontFamily: "Raleway",
          fontWeight: "900",
          color: `${theme.palette.primary.light}`,
          opacity: ".7",
          minHeight: "100vh"
        }}
      >
        This is your dashboard
      </Typography>
    </AdminLayout>
  );
};

export default Dashboard;
