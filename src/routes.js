import React, { Fragment } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/UI/Theme";
import AuthGuard from "./Hoc/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/UI/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import TheMatches from "./components/TheMathces";

import Dashboard from "./components/Admin/Dashboard";
import AdminPlayers from "./components/Admin/players";
import AddEditPlayers from "./components/Admin/players/addEditPlayers";
import AdminMatches from "./components/Admin/matches/index";
import AddEditMatch from "./components/Admin/matches/addEditMatche";
import NotFound from "./components/not_found"
import Footer from "./components/UI/Footer";
const Routes = ({user}) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header user={user} />
          <Switch>
            <Route path="/admin_matches/edit_match/:matchid" component={AuthGuard(AddEditMatch)} />
            <Route path="/admin_matches/add_match" component={AuthGuard(AddEditMatch)} />
            <Route path="/admin_matches" component={AuthGuard(AdminMatches)} />

            <Route path="/admin_players/edit_player/:playerid" component={AuthGuard(AddEditPlayers)} />
            <Route path="/admin_players/add_player" component={AuthGuard(AddEditPlayers)} />
            <Route path="/admin_players" component={AuthGuard(AdminPlayers)} />

            <Route  path="/dashboard" component={AuthGuard(Dashboard)} />
            <Route  path="/the_matches"component={AuthGuard(TheMatches)} />
            <Route path="/players" component={() => <div>Players</div>} />
            <Route  path="/sign_in" component={
              props => (<SignIn {...props} user={user} />)
            } />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer />
          {window.location.pathname === '/dashboard' ? undefined : <Footer /> }
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  );
};

export default Routes;
