import { IQuestion } from "../../Api/Questions/interfaces";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListItemText from "@mui/material/ListItemText";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  StyledButton,
  ListItemContainer,
  StyledBadge,
  getStylesByIsAnswered,
} from "./styled";
import { Typography } from "@mui/material";
import { useCallback } from "react";
import { IWebSocketProps } from "../../Api/websocket";
import { getLikedQuestionsFromLocalStorage } from "../../helpers";

interface ListItemProps {
  question: IQuestion;
  onClickListItem: (
    timestamp: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sendJsonMessage: IWebSocketProps["sendJsonMessage"];
}

const QuestionsListItem = ({
  question,
  onClickListItem,
  sendJsonMessage,
}: ListItemProps) => {
  const likedQuestions = getLikedQuestionsFromLocalStorage();

  const handleBadgeClick = useCallback(() => {
    let newLikesCount = 0;

    if (likedQuestions[question.id]) {
      delete likedQuestions[question.id];
      newLikesCount = question.likes > 0 ? question.likes - 1 : question.likes;
    } else {
      likedQuestions[question.id] = true;
      newLikesCount = question.likes + 1;
    }

    localStorage.setItem("likedQuestions", JSON.stringify(likedQuestions));

    if (sendJsonMessage) {
      sendJsonMessage({
        action: "updateQuestion",
        payload: { ...question, likes: newLikesCount },
      });
    }
  }, [likedQuestions, question, sendJsonMessage]);

  return (
    <ListItemContainer>
      <StyledButton
        variant="outlined"
        sx={getStylesByIsAnswered(question)}
        onClick={onClickListItem(question.timestamp)}
        endIcon={
          question.isAnswered ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
        }
      >
        <ListItemText>
          <Typography sx={getStylesByIsAnswered(question)}>
            {question.text}
          </Typography>
        </ListItemText>
      </StyledButton>
      <StyledBadge
        badgeContent={String(question.likes)}
        color={likedQuestions[question.id] ? "success" : "secondary"}
        onClick={handleBadgeClick}
      >
        <ThumbUpAltIcon color="primary" fontSize="large" />
      </StyledBadge>
    </ListItemContainer>
  );
};

export default QuestionsListItem;
