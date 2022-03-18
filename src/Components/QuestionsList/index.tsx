import React from "react";
import { useCallback, useEffect, useState } from "react";
import { IQuestion } from "../../Api/Questions/interfaces";
import QuestionsListItem from "../QuestionsListItem";
import { QuestionsListContainer } from "./styled";
import { ISession } from "../../Api/Session/interfaces";
import { IWebSocketProps, WSMessageTypes } from "../../Api/websocket";
import { updateQuestions } from "./updates";

interface IQuestionsListProps extends IWebSocketProps {
	session?: ISession;
}

const QuestionsList = ({ session, lastJsonMessage, sendJsonMessage }: IQuestionsListProps) => {
	const [stateQuestions, setQuestions] = useState<IQuestion[]>([]);

	useEffect(() => {
		setQuestions(session?.questions ?? []);
	}, [session]);

	useEffect(() => {
		console.log("useEffect updateQuestions");
		updateQuestions(stateQuestions, setQuestions, lastJsonMessage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastJsonMessage]);

	const onClickListItem = useCallback(
		(timestamp: number) => () => {
			if (sendJsonMessage) {
				const sq = stateQuestions.find((sq) => sq.timestamp === timestamp);

				if (sq) {
					const updatedQuestion = { ...sq, isAnswered: !sq?.isAnswered };

					sendJsonMessage({
						action: WSMessageTypes.updateQuestion,
						payload: updatedQuestion,
					});
				}
			}

			setQuestions(
				stateQuestions.map((question) => {
					return question.timestamp === timestamp
						? { ...question, isAnswered: !question.isAnswered }
						: question;
				})
			);
		},
		[sendJsonMessage, stateQuestions]
	);

	console.log("QuestionsList render", stateQuestions);
	return (
		<QuestionsListContainer>
			{stateQuestions.map((question) => (
				<React.Fragment key={question.timestamp}>
					<QuestionsListItem
						question={question}
						onClickListItem={onClickListItem}
						sendJsonMessage={sendJsonMessage}
					/>
				</React.Fragment>
			))}
		</QuestionsListContainer>
	);
};

export default QuestionsList;
