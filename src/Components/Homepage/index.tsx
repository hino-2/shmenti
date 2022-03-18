import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessionsList } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import {
	CircularProgressContainer,
	GoButton,
	HeaderContainer,
	HeaderText,
	HomePageContainer,
	RecentSessionsContainer,
	RecentSessionsHeaderText,
	SessionButton,
	StyledLink,
	StyledTextField,
	SubHeaderText,
} from "./styled";
import { CircularProgress, SpeedDialAction, Typography } from "@mui/material";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { AddSession } from "../ButtonAddSession";
import { insertSpaceInTheMiddle, sessionsByDate } from "../../helpers";

const actions = [
	{ icon: <HomeIcon />, name: "home" },
	{ icon: <AddIcon />, name: "Add" },
];

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

	// const handleSpeedDialActionClick = useCallback((name: string) => () => {
	// 	if(name === 'home') {
	// 		navigate('/')
	// 	}

	// 	if()
	// }, [navigate]);

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
				<StyledTextField
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
				<RecentSessionsContainer>
					<RecentSessionsHeaderText>Recent sessions</RecentSessionsHeaderText>
					{sessions ? (
						sessions.map((session) => (
							<StyledLink to={`${session.id}`} key={session.id}>
								<SessionButton variant="outlined">
									{session.name}&nbsp;
									<Typography variant="body2" color="secondary">
										({session.date})
									</Typography>
								</SessionButton>
							</StyledLink>
						))
					) : (
						<CircularProgressContainer>
							<CircularProgress />
						</CircularProgressContainer>
					)}
				</RecentSessionsContainer>
			</HomePageContainer>
			{/* <SpeedDial
				ariaLabel="Menu"
				icon={<MenuIcon />}
				direction="down"
				sx={{ position: "absolute", right: 10, top: 10 }}>
				{actions.map(({ name, icon }) => (
					<SpeedDialAction
						onClick={handleSpeedDialActionClick(name)}
						key={name}
						icon={icon}
						tooltipTitle={name}
					/>
				))}
			</SpeedDial> */}
			<AddSession setSessions={setSessions} />
		</>
	);
};

const ShmentiLogo = () => (
	<img src="https://shmenti.s3.eu-central-1.amazonaws.com/favicon.png" alt="logo" height={76} />
);
