import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { AddSessionButton, GrayBox } from "./styled";
import { LoadingButton } from "@mui/lab";
import { ISession } from "../../Api/Session/interfaces";
import { useAddSession } from "./hooks";

interface IAddSession {
  setSessions: React.Dispatch<React.SetStateAction<ISession[]>>;
}

export const AddSession = ({ setSessions }: IAddSession) => {
  const {
    date,
    name,
    dialogOpened,
    loading,
    handleClickOpen,
    handleClose,
    handleAddSession,
    handleDatePick,
    handleNameChange,
  } = useAddSession(setSessions);

  return (
    <>
      <Dialog open={dialogOpened} onClose={handleClose}>
        <DialogTitle>
          <Typography>Add new session</Typography>
        </DialogTitle>
        <DialogContent>
          <GrayBox>
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
          </GrayBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            variant="outlined"
            onClick={handleAddSession}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <AddSessionButton variant="outlined" onClick={handleClickOpen}>
        Add Session
      </AddSessionButton>
    </>
  );
};
