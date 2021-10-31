import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import theme from "./Theme";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import logo from "../images/logos/manchester_city_logo.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "5em",
    // [theme.breakpoints.down("sm")]: {
    //   height: "4em",
    // },
  },
  logoText: {
    fontWeight: 800,
    fontSize: "2.5rem",
    color: `${theme.palette.secondary.main} !important`,
    fontFamily: "Raleway",
    marginLeft: ".5em",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.3rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tabText: {
    fontFamily: "Raleway !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
  },
  toolbarMargin: {
    [theme.breakpoints.down("md")]: {
      marginTop: "7em",
    },
  },
  drawer: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  toggleContainer: {
    marginLeft: "auto !important",
  },
  toggleIcon: {
    width: "50px !important",
    height: "50px !important",
    [theme.breakpoints.only("xs")]: {
      width: "40px !important",
      height: "40px !important",
    },
  },
  listItemIcon: {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const routes = [
  { name: "Home", link: "/", activeIndex: 0, icon: <DashboardIcon /> },
  {
    name: "Matches",
    link: "/matches",
    activeIndex: 1,
    icon: <ListAltIcon />,
  },
  { name: "Players", link: "/players", activeIndex: 2, icon: <GroupIcon /> },
  { name: "Log", link: "/log", activeIndex: 3, icon: <ExitToAppIcon /> },
];

const Header = () => {
  const classes = useStyles();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = () => {
    setOpenDrawer(!openDrawer);
  };
  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      className={classes.tabContainer}
    >
      {routes.map((route) => (
        <Tab
          label={route.name}
          component={Link}
          to={route.link}
          key={`${route.name} ${route.activeIndex}`}
          value={route.activeIndex}
          className={classes.tabText}
        />
      ))}
    </Tabs>
  );
  const drawer = (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={openDrawer}
      onClose={handleClick}
      onOpen={handleClick}
      classes={{ paper: classes.drawer }}
    >
      <div className={classes.toolbarMargin} />
      <List>
        {routes.map((route) => (
          <ListItem divider button>
            <ListItemIcon className={classes.listItemIcon}>
              {route.icon}
            </ListItemIcon>
            <ListItemText>{route.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar style={{ zIndex: theme.zIndex.modal + 1, padding: ".5em", borderBottom: "1px solid black"}}>
          <Toolbar>
            <img src={logo} className={classes.logo} />
            <h1 className={classes.logoText}>Manchester City</h1>
            {matchesMD ? drawer : tabs}
            {matchesMD ? (
              <IconButton
                className={classes.toggleContainer}
                onClick={handleClick}
              >
                <MenuIcon className={classes.toggleIcon} />
              </IconButton>
            ) : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* <div className={classes.toolbarMargin} />s */}
    </Fragment>
  );
};

export default Header;
