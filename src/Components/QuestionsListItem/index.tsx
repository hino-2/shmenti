import { IQuestion } from "../../Api/Questions/interfaces";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListItemText from "@mui/material/ListItemText";
import { StyledButton, answeredQuestionStyle, getNotAnsweredQuestionStyle } from "./styled";

interface ListItemProps {
	question: IQuestion;
	onClickCheckListItem: (
		itemId: number
	) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionsListItem = ({ question, onClickCheckListItem }: ListItemProps) => {
	return (
		<StyledButton
			variant="outlined"
			style={question.isAnswered ? answeredQuestionStyle : getNotAnsweredQuestionStyle()}
			onClick={onClickCheckListItem(question.id)}
			endIcon={question.isAnswered ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}>
			<ListItemText primary={question.text} />
		</StyledButton>
	);
};

export default QuestionsListItem;
