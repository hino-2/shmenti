import { IQuestion } from "../../Api/Questions/interfaces";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListItemText from "@mui/material/ListItemText";
import { StyledButton, answeredQuestionStyle, notAnsweredQuestionStyle } from "./styled";
import { Typography, Badge } from "@mui/material";

interface ListItemProps {
	question: IQuestion;
	onClickCheckListItem: (
		timestamp: number
	) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionsListItem = ({ question, onClickCheckListItem }: ListItemProps) => {
	// const [likesCount, setLikesCount]

	return (
		<StyledButton
			variant="outlined"
			sx={question.isAnswered ? answeredQuestionStyle : notAnsweredQuestionStyle}
			onClick={onClickCheckListItem(question.timestamp)}
			endIcon={question.isAnswered ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}>
			<ListItemText>
				<Typography
					sx={question.isAnswered ? answeredQuestionStyle : notAnsweredQuestionStyle}>
					{question.text}
				</Typography>
				{/* <Badge /> */}
			</ListItemText>
		</StyledButton>
	);
};

export default QuestionsListItem;
