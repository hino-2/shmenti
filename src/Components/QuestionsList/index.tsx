import { Divider, Typography } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { IQuestion } from "../../Api/Questions/interfaces";
import { isLastItem } from "../../helpers";
import QuestionsListItem from "../QuestionsListItem";
import { QuestionsListContainer } from "./styled";
import { ISession } from "../../Api/Session/interfaces";
import { IWebSocketProps } from "../../Api/websocket";

interface IQuestionsListProps extends IWebSocketProps {
	session?: ISession;
}

const QuestionsList = ({ session, lastJsonMessage, sendJsonMessage }: IQuestionsListProps) => {
	const [stateQuestions, setQuestions] = useState<IQuestion[]>(session?.questions ?? []);

	useEffect(() => {
		if (session) {
			setQuestions(session.questions);
		}
	}, [session]);

	const onClickCheckListItem = useCallback(
		(itemId: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			// if (sendJsonMessage) {
			// 	sendJsonMessage({
			// 		action: "fetchQuestions",
			// 		sessionId: session?.id,
			// 	});
			// }

			setQuestions(
				stateQuestions.map((question) => {
					return question.id === itemId
						? { ...question, isAnswered: !question.isAnswered }
						: question;
				})
			);
		},
		[sendJsonMessage, session?.id, stateQuestions]
	);

	return (
		<QuestionsListContainer>
			{stateQuestions.length ? (
				stateQuestions.map((question, index) => (
					<React.Fragment key={question.id}>
						<QuestionsListItem
							question={question}
							onClickCheckListItem={onClickCheckListItem}
						/>
						{!isLastItem(index, stateQuestions.length) ? (
							<Divider style={{ width: "75%" }} />
						) : (
							<></>
						)}
					</React.Fragment>
				))
			) : (
				<Typography>No questions</Typography>
			)}
		</QuestionsListContainer>
	);
};

export default QuestionsList;
