import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/compat/app";
import Routes from "./routes";
import "./App.css";

const App = (props) => {
  return <Routes {...props} />;
};

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
