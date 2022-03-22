import { ISession } from "../../Api/Session/interfaces";
import { SessionsListItem } from "../SessionsListItem";

interface ISessionsListProps {
	sessions: ISession[];
}

export const SessionsList = ({ sessions }: ISessionsListProps) => (
	<>
		{sessions.map((session) => (
			<SessionsListItem session={session} key={session.id} />
		))}
	</>
);
