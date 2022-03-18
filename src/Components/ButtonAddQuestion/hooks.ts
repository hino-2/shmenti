import { useState, useCallback, ChangeEvent } from "react";
import { useParams } from "react-router";
import { addQuestion } from "../../Api/Questions";

export const useAddQuestion = () => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");

  const { sessionId = "" } = useParams();

  const handleClickOpen = useCallback(() => {
    setDialogOpened(true);
    setQuestionText("");
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpened(false);
  }, []);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestionText(e.target.value);
    },
    []
  );

  const handleAddQuestion = useCallback(() => {
    if (questionText) {
      const id = Date.now();

      setLoading(true);
      addQuestion({
        sessionId,
        text: questionText,
        isAnswered: false,
        id: Number(id),
        timestamp: id,
        likes: 0,
      }).then(() => {
        setDialogOpened(false);
      });
    }
  }, [questionText, sessionId]);

  return {
    questionText,
    dialogOpened,
    loading,
    handleClickOpen,
    handleClose,
    handleNameChange,
    handleAddQuestion,
  };
};
