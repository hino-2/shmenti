import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const ButtonHome = () => (
	<Link to="/">
		<Button variant="outlined" sx={{ minWidth: "unset" }}>
			<HomeIcon />
		</Button>
	</Link>
);
