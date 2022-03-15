import { useEffect, useState } from "react";
import { fetchSessionsList } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import { QuestionsListContainer } from "../QuestionsList/styled";
import { SessionButton, StyledLink } from "./styled";
import { Typography } from "@mui/material";
import { AddSession } from "../AddSession";

export const Homepage = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    fetchSessionsList().then((sessions) => {
      if (sessions?.length) {
        setSessions(sessions);
      }
    });
  }, []);

  return (
    <>
      <QuestionsListContainer>
        <Typography variant="h4" color="primary" margin={2}>
          Choose session
        </Typography>
        {sessions.map((session) => (
          <StyledLink to={`${session.id}`} key={session.id}>
            <SessionButton variant="outlined">
              {session.name}&nbsp;
              <Typography variant="body2" color="secondary">
                ({session.date})
              </Typography>
            </SessionButton>
          </StyledLink>
        ))}
      </QuestionsListContainer>
      <AddSession setSessions={setSessions} />
    </>
  );
};
