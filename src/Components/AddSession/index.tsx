import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { ChangeEvent, useCallback, useState } from "react";
import { AddSessionButton } from "./styled";
import { addSession } from "../../Api/Session";
import { LoadingButton } from "@mui/lab";

export const AddSession = () => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);

  const handleClickOpen = useCallback(() => {
    setDialogOpened(true);
    setName("");
    setDate(null);
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpened(false);
  }, []);

  const handleAddSession = useCallback(() => {
    if (name && date) {
      setLoading(true);
      addSession({
        name,
        date: new Date(date).toDateString(),
      }).then(() => {
        setDialogOpened(false);
      });
    }
  }, [date, name]);

  const handleDatePick = useCallback((newDate: any) => {
    setDate(newDate);
  }, []);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value);
    },
    []
  );

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
              value={name}
              autoFocus
              margin="normal"
              id="name"
              label="Session name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleNameChange}
            />
            <Box sx={{ minHeight: 20 }}></Box>
            <DatePicker
              label="Session date"
              value={date}
              onChange={handleDatePick}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleAddSession}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <AddSessionButton variant="contained" onClick={handleClickOpen}>
        Add Session
      </AddSessionButton>
    </>
  );
};
