import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#e8f5e9",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
