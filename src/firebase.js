import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"

// import { cityDb } from "./temp/m-city-export";

const firebaseConfig = {
  apiKey: "AIzaSyBzM0uzX3CQhzXaaw6XzUPwpufvXVl3cAU",
  authDomain: "mancity-eac21.firebaseapp.com",
  projectId: "mancity-eac21",
  storageBucket: "mancity-eac21.appspot.com",
  messagingSenderId: "721437012391",
  appId: "1:721437012391:web:4049187bd2e27133758682",
  measurementId: "G-3XWE7Y1YTD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
const DB = firebase.firestore();
const matchesCollection = DB.collection("matches");
const playersCollection = DB.collection("players");
const positionsCollection = DB.collection("positions");
const promotionsCollection = DB.collection("promotions");
const teamsCollection = DB.collection("teams");


// cityDb.matches.forEach((item) => {
//   matchesCollection.add(item);
// });

// cityDb.players.forEach((item) => {
//   playersCollection.add(item);
// });

// cityDb.positions.forEach((item) => {
//   positionsCollection.add(item);
// });

// cityDb.promotions.forEach((item) => {
//   promotionsCollection.add(item);
// });

// cityDb.teams.forEach((item) => {
//   teamsCollection.add(item);
// });

export {
  firebase,
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection,
};
