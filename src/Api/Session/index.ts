import axios from "axios";
import { calcNewSessionId } from "../../helpers";
import {
  headers,
  QUESTIONS_TABLE_NAME,
  REST_API_URL,
  SESSIONS_TABLE_NAME,
} from "../shared";
import { ISession } from "./interfaces";

export const fetchSessionById = async (
  sessionId: string
): Promise<ISession | null> => {
  const [sessionFromDb, questionsFromDb] = await Promise.all([
    axios.post(
      `${REST_API_URL}/session/${sessionId}`,
      {
        TableName: SESSIONS_TABLE_NAME,
        FilterExpression: "id = :val",
        ExpressionAttributeValues: { ":val": { N: sessionId } },
      },
      { headers }
    ),
    axios.post(
      `${REST_API_URL}/session/${sessionId}`,
      {
        TableName: QUESTIONS_TABLE_NAME,
        FilterExpression: "sessionId = :val",
        ExpressionAttributeValues: { ":val": { S: sessionId } },
      },
      { headers }
    ),
  ]);

  const session = sessionFromDb?.data?.Items?.[0];
  const questions = questionsFromDb?.data?.Items ?? [];

  if (!session)
    return {
      id: 0,
      date: "",
      name: "No such session",
    };

  return {
    id: session.id.N,
    date: session.date.S,
    name: session.name.S,
    questions: questions.map((question: any) => ({
      id: question.id.N,
      text: question.text.S,
      isAnswered: question.isAnswered.BOOL,
      timestamp: question.timestamp.N,
      sessionId: session.id.N,
    })),
  };
};

export const fetchSessionsList = async (): Promise<ISession[]> => {
  const response = await axios.post(
    `${REST_API_URL}/session`,
    {
      TableName: SESSIONS_TABLE_NAME,
      ProjectionExpression: "id, #date, #name",
      ExpressionAttributeNames: {
        "#name": "name",
        "#date": "date",
      },
      // Limit: 20, /** TODO: Limit + Sort on request level */
    },
    { headers }
  );

  const sessions = response.data.Items;

  return sessions
    .map((session: any) => ({
      id: session.id.N,
      date: session.date.S,
      name: session.name.S,
    }))
    .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
    .splice(0, 20); /** TODO: Limit + Sort on request level */
};

export const addSession = async (newSession: Omit<ISession, "id">) => {
  const sessions = await fetchSessionsList();

  const newSessionId = calcNewSessionId(sessions);

  return axios.post(
    `${REST_API_URL}/session/add`,
    {
      TableName: SESSIONS_TABLE_NAME,
      Item: {
        id: {
          N: String(newSessionId),
        },
        date: {
          S: newSession.date,
        },
        name: {
          S: newSession.name,
        },
      },
      ConditionExpression: "attribute_not_exists(id)",
    },
    { headers }
  );
};
