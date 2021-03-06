import { Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
	width: 100%;
	display: flex;
	justify-content: center;
	text-decoration: none;
`;

export const SessionButton = styled(Button)`
	width: 100%;
	height: unset;
	margin: 8px;
	text-transform: none;
`;
