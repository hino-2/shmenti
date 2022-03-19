import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FASTDEV_FONT_FAMILY } from "../../Style/theme";
import { useAddQuestion } from "./hooks";

interface IButtonAddQuestionProps {
	sessionExists: boolean;
}

export const ButtonAddQuestion = ({ sessionExists }: IButtonAddQuestionProps) => {
	const {
		questionText,
		dialogOpened,
		loading,
		handleClickOpen,
		handleClose,
		handleNameChange,
		handleAddQuestion,
	} = useAddQuestion();

	return (
		<>
			<Dialog open={dialogOpened} onClose={handleClose}>
				<DialogTitle>
					<Typography>Add new question</Typography>
				</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							minWidth: 400,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}>
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
							sx={FASTDEV_FONT_FAMILY}
							onChange={handleNameChange}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<LoadingButton loading={loading} variant="outlined" onClick={handleAddQuestion}>
						Add
					</LoadingButton>
				</DialogActions>
			</Dialog>
			{sessionExists ? (
				<Button
					variant="outlined"
					sx={{ marginTop: 1, minWidth: "unset" }}
					onClick={handleClickOpen}>
					<AddIcon />
				</Button>
			) : (
				<></>
			)}
		</>
	);
};
