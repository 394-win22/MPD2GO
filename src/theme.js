import { createTheme } from "@mui/material/styles";

const font = "'Helvetica Neue', sans-serif";

const theme = createTheme({
  root: {
    color: "#f0f2f5",
    backgroundColor: "#f1b844",
  },
  palette: {
    primary: {
      main: "#e5b843",
      contrastText: "white",
    },
    secondary: { main: "#ffffff", contrastText: "#e0aa43" },
  },
  typography: {
    fontFamily: font,
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 975,
      lg: 1250,
      xl: 1920,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // '@font-face': [productSans],
      },
    },
  },
});

export default theme;
