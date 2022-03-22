import { Typography } from "@mui/material";
import { ISession } from "../../Api/Session/interfaces";
import { SessionButton, StyledLink } from "./styled";

interface ISessionListItemProps {
	session: ISession;
}

export const SessionsListItem = ({ session }: ISessionListItemProps) => {
	return (
		<StyledLink to={`${session.id}`}>
			<SessionButton variant="outlined">
				{session.name}&nbsp;
				<Typography variant="body2" color="secondary">
					({session.date})
				</Typography>
			</SessionButton>
		</StyledLink>
	);
};
