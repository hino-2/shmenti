import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSessionsList } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import { QuestionsListContainer } from "../QuestionsList/styled";
import { SessionButton } from "./styled";
import { Typography } from "@mui/material";
import { AddSession } from "../AddSession";

export const Homepage = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    fetchSessionsList().then((sessions) => {
      if (sessions.length) {
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
          <Link
            to={`${session.id}`}
            key={session.id}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <SessionButton variant="outlined">{session.name}</SessionButton>
          </Link>
        ))}
      </QuestionsListContainer>
      <AddSession />
    </>
  );
};
