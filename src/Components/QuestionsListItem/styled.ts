import { Badge, Box, Button, styled } from "@mui/material";
import { IQuestion } from "../../Api/Questions/interfaces";

export const ListItemContainer = styled(Box)`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export const StyledQuestionButton = styled(Button)`
	max-width: 65%;
	width: 100%;
	height: unset;
	margin: 5px;
	text-transform: none;
`;

export const StyledBadge = styled(Badge)({
	cursor: "pointer",
});

export const StyledLikeButton = styled(Button)({
	width: "50px",
	minWidth: "unset",
});

const answeredQuestionStyle = {
	// border: 0,
	color: "#16eab733",
};

const notAnsweredQuestionStyle = {
	// borderWidth: 0,
};

export const getStylesByIsAnswered = (question: IQuestion) =>
	question.isAnswered ? answeredQuestionStyle : notAnsweredQuestionStyle;
