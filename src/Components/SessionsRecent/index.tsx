import { CircularProgress } from "@mui/material";
import { ISession } from "../../Api/Session/interfaces";
import { SessionsList } from "../SessionsList";
import {
	RecentSessionsContainer,
	RecentSessionsHeaderText,
	CircularProgressContainer,
} from "./styled";

interface IRecentSessionsProps {
	sessions: ISession[] | undefined;
}

export const RecentSessions = ({ sessions }: IRecentSessionsProps) => (
	<RecentSessionsContainer>
		<RecentSessionsHeaderText>Recent sessions</RecentSessionsHeaderText>
		{sessions ? (
			<SessionsList sessions={sessions} />
		) : (
			<CircularProgressContainer>
				<CircularProgress />
			</CircularProgressContainer>
		)}
	</RecentSessionsContainer>
);
