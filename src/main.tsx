import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, darken, lighten, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: lighten("#3373ab", 0.4),
      main: "#3373ab",
      dark: darken("#3373ab", 0.2),
      contrastText: "#000",
    },
    secondary: {
      light: lighten("#FBAE12", 0.4),
      main: "#FBAE12",
      dark: darken("#FBAE12", 0.2),
      contrastText: "#212121",
    },
    background: { default: "#ECECEC", paper: "#fff" },
    text: { primary: "#1A1A1A", secondary: "#555" },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
