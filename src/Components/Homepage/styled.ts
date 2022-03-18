import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FASTDEV_COLOR_MAIN } from "../../Style/theme";

export const HomePageContainer = styled(Box)`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: center;
	justify-content: center;
	align-items: center;
`;

export const SessionButton = styled(Button)`
	width: 100%;
	height: unset;
	margin: 8px;
	text-transform: none;
`;

export const StyledLink = styled(Link)`
	width: 100%;
	display: flex;
	justify-content: center;
	text-decoration: none;
`;

export const HeaderContainer = styled(Box)({
	display: "flex",
	marginTop: 20,
	marginBottom: 20,
});

export const HeaderText = styled(Typography)`
	margin-top: 2px;
	margin-left: 10px;
`;

export const SubHeaderText = styled(Typography)`
	margin-top: 10px;
`;

export const StyledTextField = styled(TextField)({
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: FASTDEV_COLOR_MAIN,
		},
		"&:hover fieldset": {
			borderColor: FASTDEV_COLOR_MAIN,
		},
	},
	width: "40%",
	marginBottom: 10,
});

export const GoButton = styled(Button)`
	width: 100px;
`;

export const RecentSessionsContainer = styled(Box)`
	width: 60%;
	margin-top: 90px;
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: center;
	justify-content: center;
	align-items: center;
`;

export const RecentSessionsHeaderText = styled(Typography)`
	margin: 10px;
`;

export const CircularProgressContainer = styled(Box)({
	display: "flex",
	justifyContent: "center",
	marginTop: "8px",
	/** To force vertical scrollbar to appear so width of the whole page wont change */
	minHeight: "1000px",
});
