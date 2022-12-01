import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//Styles
import "./App.scss";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";

import "./App.scss";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "1.78rem"
    }
  }
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
