import { IQuestion } from "../../Api/Questions/interfaces";
import { WSMessageTypes } from "../../Api/websocket";

export const updateQuestions = (
  stateQuestions: IQuestion[],
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>,
  lastJsonMessage: any
) => {
  if (
    lastJsonMessage?.type === WSMessageTypes.newQuestion &&
    lastJsonMessage.payload
  ) {
    const isExists = stateQuestions.find(
      (sq) => sq.id === lastJsonMessage.payload.id.N
    );

    if (!isExists) {
      setQuestions([
        ...stateQuestions,
        {
          id: lastJsonMessage.payload.id.N,
          text: lastJsonMessage.payload.text.S,
          isAnswered: lastJsonMessage.payload.isAnswered.BOOL,
          timestamp: lastJsonMessage.payload.timestamp.N,
          sessionId: lastJsonMessage.payload.sessionId.S,
        },
      ]);
    }
  }

  if (
    lastJsonMessage?.type === WSMessageTypes.updateQuestion &&
    lastJsonMessage.payload
  ) {
    const updatedQuestions = stateQuestions.map((sq) =>
      sq.id === lastJsonMessage.payload.id.N
        ? {
            id: lastJsonMessage.payload.id.N,
            text: lastJsonMessage.payload.text.S,
            isAnswered: lastJsonMessage.payload.isAnswered.BOOL,
            timestamp: lastJsonMessage.payload.timestamp.N,
            sessionId: lastJsonMessage.payload.sessionId.S,
          }
        : sq
    );

    setQuestions(updatedQuestions);
  }
};
