import React from "react";
import { Link, withRouter } from "react-router-dom";
// import { ListItem } from "@mui/material";
import { logoutHandler } from "../../Utils/tools";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    marginTop: "5rem",
  },
  textDrawer: {
    color: "#fff"
  },
  iconDrawer: {
    color: "#Fff"
  }
}));
const AdminNav = (props) => {
  const classes = useStyles();
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

  return (
    <Drawer classes={{paper: classes.drawer}} variant="permanent" anchor="left">
      <Toolbar />
      <List>
        {links.map((link, index) => (
          <ListItem component={Link} button key={link} divider>
            <ListItemIcon className={classes.iconDrawer}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText className={classes.textDrawer}>{link.title}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Button  onClick={() => logoutHandler()}>logout</Button>
    </Drawer>
  );
};

export default withRouter(AdminNav);
