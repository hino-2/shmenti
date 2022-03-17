import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessionsList } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import {
  CircularProgressContainer,
  GoButton,
  HeaderText,
  HomePageContainer,
  RecentSessionsContainer,
  RecentSessionsHeaderText,
  SessionButton,
  StyledLink,
  StyledTextField,
  SubHeaderText,
} from "./styled";
import { CircularProgress, Typography } from "@mui/material";
import { AddSession } from "../AddSession";

export const Homepage = () => {
  const [sessions, setSessions] = useState<ISession[]>();
  const [sessionId, setSessionId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSessionsList().then((sessions) => {
      setSessions(sessions?.length ? sessions : []);
    });
  }, []);

  const handleGoButtonClick = useCallback(() => {
    navigate(`/${sessionId}`);
  }, [navigate, sessionId]);

  const handleSessionIdInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <HeaderText variant="h2" color="primary">
          Shmenti
        </HeaderText>
        <SubHeaderText>Please enter the code</SubHeaderText>
        <StyledTextField
          value={sessionId}
          autoFocus
          margin="normal"
          type="text"
          variant="outlined"
          onChange={handleSessionIdInputChange}
          onKeyDown={handleSessionIdInputKeyDown}
          placeholder="1111"
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
      <AddSession setSessions={setSessions} />
    </>
  );
};
