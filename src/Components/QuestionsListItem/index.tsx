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
import { getIsLikedQuestion, setIsLikedQuestion, setIsNotLikedQuestion } from "../../helpers";

interface ListItemProps {
	question: IQuestion;
	onClickListItem: (
		timestamp: number
	) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	sendJsonMessage: IWebSocketProps["sendJsonMessage"];
}

const QuestionsListItem = ({ question, onClickListItem, sendJsonMessage }: ListItemProps) => {
	const [likesCount, setLikesCount] = useState(question?.likes ?? 0);
	const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false);

	const isLiked = getIsLikedQuestion(question.id);

	useEffect(() => {
		setLikesCount(question.likes);
	}, [question.likes]);

	const doubleClickProtect = useCallback(() => {
		setIsLikeButtonDisabled(true);

		setTimeout(() => {
			setIsLikeButtonDisabled(false);
		}, 500);
	}, []);

	const handleLikeButtonClick = useCallback(() => {
		doubleClickProtect();

		let newLikesCount = 0;

		if (isLiked) {
			setIsNotLikedQuestion(question.id);
			newLikesCount = Math.max(0, likesCount - 1);
		} else {
			setIsLikedQuestion(question.id);
			newLikesCount = likesCount + 1;
		}

		setLikesCount(newLikesCount);

		if (sendJsonMessage) {
			sendJsonMessage({
				action: WSMessageTypes.updateQuestion,
				payload: { ...question, likes: newLikesCount },
			});
		}
	}, [doubleClickProtect, isLiked, likesCount, question, sendJsonMessage]);

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
				color={isLiked ? "success" : "secondary"}>
				<StyledLikeButton
					variant="text"
					disabled={isLikeButtonDisabled}
					onClick={handleLikeButtonClick}>
					<ThumbUpAltIcon color="primary" fontSize="large" />
				</StyledLikeButton>
			</StyledBadge>
		</ListItemContainer>
	);
};

export default QuestionsListItem;
