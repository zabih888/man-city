import { createTheme } from "@mui/material/styles";

const arcLightBlue = "#98c5e9";
const arcBlue = "#0d1831";
const arcWhite = "#ffffff";

const theme = createTheme({
  palette: {
    primary: {
      main: "#98c5e9",
    },
    secondary: {
      main: "#ffffff",
    },
    info: {
      main: "#0d1831",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
      info: "#ffffff",
    },
  },
});
export default theme;
