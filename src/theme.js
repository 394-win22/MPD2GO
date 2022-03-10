import { createTheme } from "@mui/material/styles";

const font = "'Helvetica Neue', sans-serif";

const theme = createTheme({
  root: {
    color: "#f0f2f5",
    backgroundColor: "#f1b844",
  },
  palette: {
    foreground: "#ffffff",
    primary: {
      main: "#f1b844",
      contrastText: "#f3f3f3ff",
    },
    secondary: { main: "#3a5f95", contrastText: "#f3f3f3ff" },
    notification: "#e04141",
  },
  typography: {
    fontFamily: font,
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12
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
