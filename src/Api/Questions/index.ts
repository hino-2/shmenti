import axios from "axios";
import { headers, REST_API_URL, QUESTIONS_TABLE_NAME } from "../shared";
import { IQuestion } from "./interfaces";

export const addQuestion = async (question: IQuestion) => {
  return axios.post(
    `${REST_API_URL}/question/add`,
    {
      TableName: QUESTIONS_TABLE_NAME,
      Item: {
        id: { N: String(question.timestamp) },
        sessionId: { S: String(question.sessionId) },
        text: { S: question.text },
        isAnswered: { BOOL: false },
        timestamp: { N: String(question.timestamp) },
        likes: { N: "0" },
      },
    },
    { headers }
  );
};
