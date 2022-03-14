import axios from "axios";
import { headers, REST_API_URL, QUESTIONS_TABLE_NAME } from "../shared";
import { IQuestion } from "./interfaces";

// export const fetchQuestionsMock = async (sessionId: string): Promise<IQuestion[]> => {
// 	return [
// 		{
// 			id: 1,
// 			sessionId,
// 			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
// 			isAnswered: true,
// 		},
// 		{
// 			id: 2,
// 			sessionId,
// 			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// 			isAnswered: false,
// 		},
// 		{
// 			id: 3,
// 			sessionId,
// 			text: "This is question #3",
// 			isAnswered: false,
// 		},
// 	];
// };

// export const fetchQuestions = async (sessionId: string): Promise<IQuestion[]>

export const addQuestion = async (question: IQuestion) => {
  return axios.post(
    `${REST_API_URL}/question/add`,
    {
      TableName: QUESTIONS_TABLE_NAME,
      Item: {
        id: { N: String(question.timestamp) },
        sessionId: { S: String(question.sessionId) },
        text: { S: question.text },
        isAnswered: { BOOL: question.isAnswered },
        timestamp: { N: String(question.timestamp) },
      },
    },
    { headers }
  );
};
