import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessionsList } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import {
	GoButton,
	HeaderContainer,
	HeaderText,
	HomePageContainer,
	SessionCodeInputField,
	SubHeaderText,
} from "./styled";
import { AddSession } from "../ButtonAddSession";
import { insertSpaceInTheMiddle, sessionsByDate } from "../../helpers";
import { RecentSessions } from "../SessionsRecent";

export const Homepage = () => {
	const [sessions, setSessions] = useState<ISession[]>();
	const [sessionId, setSessionId] = useState<string>("");

	const navigate = useNavigate();

	useEffect(() => {
		fetchSessionsList().then((sessions) => {
			setSessions(sessions?.length ? sessions.sort(sessionsByDate) : []);
		});
	}, []);

	const handleGoButtonClick = useCallback(() => {
		navigate(`/${sessionId.replace(" ", "")}`);
	}, [navigate, sessionId]);

	const handleSessionIdInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			if (e.target.value.length > 9 || e.target.value.match(/[a-zA-Z]/)) {
				return;
			}

			if (e.target.value.length > 4) {
				setSessionId(insertSpaceInTheMiddle(e.target.value));

				return;
			}

			setSessionId(e.target.value);
		},
		[setSessionId]
	);

	const handleSessionIdInputKeyDown = useCallback(
		(e: KeyboardEvent<HTMLDivElement>) => {
			if (e.code === "Enter") {
				handleGoButtonClick();
			}
		},
		[handleGoButtonClick]
	);

	return (
		<>
			<HomePageContainer>
				<HeaderContainer>
					<ShmentiLogo />
					<HeaderText variant="h2" color="primary">
						Shmenti
					</HeaderText>
				</HeaderContainer>
				<SubHeaderText>Please enter the code</SubHeaderText>
				<SessionCodeInputField
					value={sessionId}
					autoFocus
					margin="normal"
					type="text"
					variant="outlined"
					onChange={handleSessionIdInputChange}
					onKeyDown={handleSessionIdInputKeyDown}
					placeholder="1111 1111"
				/>
				<GoButton variant="outlined" onClick={handleGoButtonClick}>
					Go
				</GoButton>
				<RecentSessions sessions={sessions} />
			</HomePageContainer>
			<AddSession setSessions={setSessions} />
		</>
	);
};

const ShmentiLogo = () => (
	<img
		src="https://s3.eu-central-1.amazonaws.com/www.shmenti.ru/favicon.png"
		alt="logo"
		height={76}
	/>
);
