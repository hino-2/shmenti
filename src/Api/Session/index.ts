import axios from "axios";
import { ISession } from "./interfaces";

const SESSIONS_TABLE_NAME = "shmenti-sessions";
const REST_API_URL = "https://0bl1kulea6.execute-api.eu-central-1.amazonaws.com/production";

const headers = {
	"Content-Type": "application/json",
};

export const fetchSessionById = async (sessionId: string): Promise<ISession> => {
	const response = await axios.post(
		`${REST_API_URL}/session/${sessionId}`,
		{
			TableName: SESSIONS_TABLE_NAME,
			FilterExpression: "id = :val",
			ExpressionAttributeValues: { ":val": { N: sessionId } },
		},
		{ headers }
	);

	const session = response.data.Items[0];
	console.log(session);

	return {
		id: session.id.N,
		date: session.date.S,
		name: session.name.S,
		questions: session.questions.L.map((question: any) => ({
			id: question.M.id.N,
			text: question.M.text.S,
			isAnswered: question.M.isAnswered.BOOL,
		})),
	};
};
