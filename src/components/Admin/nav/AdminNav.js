import React from "react";
import { Link, withRouter } from "react-router-dom";
import { ListItem } from "@mui/material";
import {logoutHandler } from "../../Utils/tools";

const AdminNav = (props) => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
  ];
  const renderItems = () =>
    links.map((link) => (
      <Link to={link.linkTok} key={link.title}>
        <ListItem button>{link.title}</ListItem>
      </Link>
    ));
  return <div>
      {renderItems()}
      <ListItem button onClick={() => logoutHandler()}>logout</ListItem>
      </div>;
};

export default withRouter(AdminNav);
