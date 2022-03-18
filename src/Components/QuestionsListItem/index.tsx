import { IQuestion } from "../../Api/Questions/interfaces";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListItemText from "@mui/material/ListItemText";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
	StyledQuestionButton,
	ListItemContainer,
	StyledBadge,
	getStylesByIsAnswered,
	StyledLikeButton,
} from "./styled";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IWebSocketProps, WSMessageTypes } from "../../Api/websocket";
import { getLikedQuestionsFromLocalStorage } from "../../helpers";

interface ListItemProps {
	question: IQuestion;
	onClickListItem: (
		timestamp: number
	) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	sendJsonMessage: IWebSocketProps["sendJsonMessage"];
}

const QuestionsListItem = ({ question, onClickListItem, sendJsonMessage }: ListItemProps) => {
	const [likesCount, setLikesCount] = useState(question?.likes ?? 0);

	const likedQuestions = getLikedQuestionsFromLocalStorage();

	useEffect(() => {
		setLikesCount(question.likes);
	}, [question.likes]);

	const handleBadgeClick = useCallback(() => {
		let newLikesCount = 0;

		if (likedQuestions[question.id]) {
			delete likedQuestions[question.id];
			newLikesCount = likesCount > 0 ? likesCount - 1 : likesCount;
		} else {
			likedQuestions[question.id] = true;
			newLikesCount = likesCount + 1;
		}

		setLikesCount(newLikesCount);

		if (sendJsonMessage) {
			sendJsonMessage({
				action: WSMessageTypes.updateQuestion,
				payload: { ...question, likes: newLikesCount },
			});
		}

		localStorage.setItem("likedQuestions", JSON.stringify(likedQuestions));
	}, [likedQuestions, likesCount, question, sendJsonMessage]);

	return (
		<ListItemContainer>
			<StyledQuestionButton
				variant="outlined"
				sx={getStylesByIsAnswered(question)}
				onClick={onClickListItem(question.timestamp)}
				endIcon={question.isAnswered ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}>
				<ListItemText>
					<Typography sx={getStylesByIsAnswered(question)}>{question.text}</Typography>
				</ListItemText>
			</StyledQuestionButton>
			<StyledBadge
				badgeContent={String(likesCount)}
				color={likedQuestions[question.id] ? "success" : "secondary"}
				onClick={handleBadgeClick}>
				<StyledLikeButton variant="text">
					<ThumbUpAltIcon color="primary" fontSize="large" />
				</StyledLikeButton>
			</StyledBadge>
		</ListItemContainer>
	);
};

export default QuestionsListItem;
