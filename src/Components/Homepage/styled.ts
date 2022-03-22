import { Box, Button, styled, TextField, Typography } from "@mui/material";
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

export const SessionCodeInputField = styled(TextField)({
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
