import { createTheme } from "@mui/material/styles";
import { palette } from "@mui/system";

const arcLightBlue = "#98c5e9";
const arcBlue = "#0d1831";
const arcWhite = "#ffffff";

const theme = createTheme({
  palette: {
    primary: {
      main: arcLightBlue,
    },
    secondary: {
      main: arcBlue,
    },
    common: {
      white: arcWhite,
    },
    text: {
      // primary: "#ffffff",
      // secondary: "#ffffff",
      // info: "#ffffff",
    },
  },
  typography: {
    homeText: {
      fontFamily: "Raleway",
      position: "absolute",
      background: arcBlue,
      color: arcWhite,
      fontSize: "92px",
      textTransform: "uppercase",
      padding: "0px 20px",
      fontWeight: 600,
    },  
    h1: {
      fontFamily: "Raleway",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Raleway",
      color: arcWhite,
      fontWeight: 600,
    },
    // subtitle1 is the all of subtitle in AddEdit Match/Player
    subtitle1: {
      fontFamily: "Raleway",
      fontWeight: 600,
      margin: ".8rem 0"
    },
    h6: {
      fontFamily: "Raleway",
      color: arcWhite,
      fontWeight: 600,
    },
    lightButton: {
      backgroundColor: arcLightBlue,
      fontFamily: "Raleway",
      borderRadius: "0px !important",
    },
    darkButton: {
      backgroundColor: `${arcBlue} !important`,
      color:`${arcWhite} !important`,
      fontFamily: "Raleway",
      borderRadius: "0px !important",
    },
    
  },
});
export default theme;
