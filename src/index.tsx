import { ThemeProvider } from "@mui/material";
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
import { theme } from "./Style/theme";
import { Footer } from "./Components/Footer";

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
        <Footer />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
