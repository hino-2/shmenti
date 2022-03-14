import { createTheme, ThemeProvider } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import QuestionsList from "./Components/QuestionsList";
import { SessionHeader } from "./Components/SessionHeader";
import { DataProvider } from "./Components/DataProvider";
import { Homepage } from "./Components/Homepage";
import { ButtonsMenu } from "./Components/ButtonsMenu";

const theme = createTheme({
  palette: {
    secondary: {
      main: "##1de9b6",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path=":sessionId"
              element={
                <DataProvider>
                  <SessionHeader />
                  <QuestionsList />
                  <ButtonsMenu />
                </DataProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
