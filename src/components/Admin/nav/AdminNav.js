import React from "react";
import { Link, withRouter } from "react-router-dom";
// import { ListItem } from "@mui/material";
import { logoutHandler } from "../../Utils/tools";

import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Tab, Tabs, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../../UI/Theme";

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    marginTop: "5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "3rem !important",
    },
  },
  textDrawer: {
    color: `${theme.palette.common.white} !important`,
  },
  iconDrawer: {
    color: `${theme.palette.common.white} !important`,
  },
  buttonLogout: {
    ...theme.typography.lightButton ,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
  },
}));

const AdminNav = (props) => {
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
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
    <Drawer
      classes={{ paper: classes.drawer }}
      variant="permanent"
      anchor={matchesMD ? "bottom" : "left"}
    >
      {matchesMD ? undefined : <Toolbar />}
      <List>
        {links.map((link, index) => (
          <ListItem component={Link} button key={link} divider to={link.linkTo}>
            <ListItemIcon className={classes.iconDrawer}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText className={classes.textDrawer}>
              {link.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
        <Button
          variant="contained"
          className={classes.buttonLogout}
          onClick={() => logoutHandler()}
        >
          logout
        </Button>
    </Drawer>
  );
};

export default withRouter(AdminNav);
