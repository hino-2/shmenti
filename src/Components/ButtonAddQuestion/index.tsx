import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { addQuestion } from "../../Api/Questions";

export const ButtonAddQuestion = () => {
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
      setLoading(true);
      addQuestion({
        sessionId,
        text: questionText,
        isAnswered: false,
        timestamp: Date.now(),
      }).then(() => {
        setDialogOpened(false);
      });
    }
  }, [questionText, sessionId]);

  return (
    <>
      <Dialog open={dialogOpened} onClose={handleClose}>
        <DialogTitle>Add new session</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              minWidth: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextField
              value={questionText}
              multiline
              autoFocus
              margin="normal"
              id="text"
              label="Your question"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleNameChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleAddQuestion}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        sx={{ marginTop: 1 }}
        onClick={handleClickOpen}
      >
        Add question
      </Button>
    </>
  );
};
