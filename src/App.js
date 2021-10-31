import React, { Fragment } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/UI/Theme";
import Header from "./components/UI/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn/index";
import "./App.css"



const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="sign-in" component={SignIn} />
            <Route exact path="/" component={Home} />
            <Route exact path="/matches" component={() => <div>Matches</div>} />
            <Route exact path="/players" component={() => <div>Players</div>} />
            <Route exact path="/log" component={() => <div>Log</div>} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
