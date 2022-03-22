import { Box, styled, Typography } from "@mui/material";

export const RecentSessionsContainer = styled(Box)`
	width: 60%;
	margin-top: 90px;
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: center;
	justify-content: center;
	align-items: center;
`;

export const RecentSessionsHeaderText = styled(Typography)`
	margin: 10px;
`;

export const CircularProgressContainer = styled(Box)({
	display: "flex",
	justifyContent: "center",
	marginTop: "8px",
	/** To force vertical scrollbar to appear so width of the whole page wont change */
	minHeight: "1000px",
});
