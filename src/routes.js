import React, { Fragment } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/UI/Theme";
import Header from "./components/UI/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Admin/Dashboard";
import AuthGuard from "./Hoc/Auth";


const Routes = ({user}) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header user={user} />
          <Switch>
            <Route exact path="/dashboard" component={AuthGuard(Dashboard)} />
            <Route exact path="/sign_in" component={
              props => (<SignIn {...props} user={user} />)
            } />
            <Route exact path="/" component={Home} />
            <Route exact path="/matches" component={() => <div>Matches</div>} />
            <Route exact path="/players" component={() => <div>Players</div>} />
          </Switch>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  );
};

export default Routes;
