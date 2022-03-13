import { Button, styled } from "@mui/material";

export const getRandomHexColor = () =>
	"#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

export const StyledButton = styled(Button)`
	max-width: 75%;
	width: 100%;
	margin: 5px;
	text-transform: none;
`;

export const answeredQuestionStyle = {
	border: 0,
	color: "#00000042",
};

export const getNotAnsweredQuestionStyle = () => ({
	// borderColor: getRandomHexColor(),
	borderWidth: 0,
});
