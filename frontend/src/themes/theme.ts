import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#43a047",
    },

    background: {
      default: "#f5f7fa",
    },
  },

  typography: {
    fontFamily: "Roboto",

    h4: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
