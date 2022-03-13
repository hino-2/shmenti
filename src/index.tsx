import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import QuestionsList from "./Components/QuestionsList";
import { SessionHeader } from "./Components/SessionHeader";
import { DataProvider } from "./Components/DataProvider";

const sessionId = window.location.pathname.replace("/", "");

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
			<DataProvider sessionId={sessionId}>
				<SessionHeader />
				<QuestionsList />
			</DataProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
