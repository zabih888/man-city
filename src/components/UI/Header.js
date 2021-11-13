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
  Button,
} from "@mui/material";
import logo from "../../images/logos/manchester_city_logo.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logoutHandler } from "../Utils/tools";
import { Login } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "5em",
    [theme.breakpoints.only("xs")]: {
      height: "4.4em",
    },
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
    [theme.breakpoints.only("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.6rem",
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
  logOutButton: {
    marginLeft: "20px !important",
    ...theme.typography.darkButton,
    borderRadius: "12px !important",
    "&:hover": {
      backgroundColor: `${theme.palette.common.white} !important`,
      color: `${theme.palette.secondary.main} !important`,
    },
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

const Header = ({ user }) => {
  const routes = [
    { name: "Home", link: "/", activeIndex: 0, icon: <DashboardIcon /> },
    {
      name: "Matches",
      link: "/the_matches",
      activeIndex: 1,
      icon: <ListAltIcon />,
    },
    {name: "Sign In", link: "/sign_in", icon: <Login /> },
  ];
  const routesHasUser = [
    { name: "Home", link: "/", activeIndex: 0, icon: <DashboardIcon /> },
    {
      name: "Matches",
      link: "/the_matches",
      activeIndex: 1,
      icon: <ListAltIcon />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      activeIndex: 2,
      icon: <ExitToAppIcon />,
    },
  ];
  
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

  useEffect(() => {
    routes.forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, routes]);
  useEffect(() => {
    routesHasUser.forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, routesHasUser]);

  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      className={classes.tabContainer}
    >
      {user
        ? routesHasUser.map((route) => (
            <Tab
              label={route.name}
              component={Link}
              to={route.link}
              key={`${route.name} ${route.activeIndex}`}
              value={route.activeIndex}
              className={classes.tabText}
            />
          ))
        : routes.map((route) => (
            <Tab
              label={route.name}
              component={Link}
              to={route.link}
              key={`${route.name} ${route.activeIndex}`}
              value={route.activeIndex}
              className={classes.tabText}
            />
          ))}
      {user ? (
        <Button
          className={classes.logOutButton}
          onClick={logoutHandler}
          variant="contained"
        >
          logOut
        </Button>
      ) : undefined}
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
        {user
          ? routesHasUser.map((route) => (
              <ListItem to={route.link} component={Link} divider button>
                <ListItemIcon className={classes.listItemIcon}>
                  {route.icon}
                </ListItemIcon>
                <ListItemText>{route.name}</ListItemText>
              </ListItem>
            ))
          : routes.map((route) => (
              <ListItem to={route.link} component={Link} divider button>
                <ListItemIcon className={classes.listItemIcon}>
                  {route.icon}
                </ListItemIcon>
                <ListItemText>{route.name}</ListItemText>
              </ListItem>
            ))}
        {user ? (
          <Button
            onClick={logoutHandler}
            variant="contained"
            color="secondary"
            fullWidth
            style={{ padding: "1rem", borderRadius: "0" }}
          >
            logOut
          </Button>
        ) : undefined}
      </List>
    </SwipeableDrawer>
  );

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar
          style={{
            zIndex: theme.zIndex.modal + 1,
            padding: ".5em",
            borderBottom: "1px solid black",
          }}
        >
          <Toolbar>
            <Link to="/" >
              <img src={logo} className={classes.logo} />
            </Link>
            <h1 className={classes.logoText}>Man City</h1>
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
    </Fragment>
  );
};

export default Header;
