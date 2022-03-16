import { Divider } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { IQuestion } from "../../Api/Questions/interfaces";
import { isLastItem } from "../../helpers";
import QuestionsListItem from "../QuestionsListItem";
import { QuestionsListContainer } from "./styled";
import { ISession } from "../../Api/Session/interfaces";
import { IWebSocketProps } from "../../Api/websocket";
import { updateQuestions } from "./updates";

interface IQuestionsListProps extends IWebSocketProps {
  session?: ISession;
}

const QuestionsList = ({
  session,
  lastJsonMessage,
  sendJsonMessage,
}: IQuestionsListProps) => {
  const [stateQuestions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    setQuestions(session?.questions ?? []);
  }, [session]);

  useEffect(() => {
    updateQuestions(stateQuestions, setQuestions, lastJsonMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  const onClickCheckListItem = useCallback(
    (timestamp: number) => () => {
      if (sendJsonMessage) {
        const sq = stateQuestions.find((sq) => sq.timestamp === timestamp);

        if (sq) {
          const updatedQuestion = { ...sq, isAnswered: !sq?.isAnswered };

          sendJsonMessage({
            action: "updateQuestion",
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

  return (
    <QuestionsListContainer>
      {stateQuestions.map((question, index) => (
        <React.Fragment key={question.timestamp}>
          <QuestionsListItem
            question={question}
            onClickCheckListItem={onClickCheckListItem}
          />
          {!isLastItem(index, stateQuestions?.length ?? 0) ? (
            <Divider style={{ width: "75%" }} />
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </QuestionsListContainer>
  );
};

export default QuestionsList;
