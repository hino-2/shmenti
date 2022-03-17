import { ISession } from "../Api/Session/interfaces";

export const isLastItem = (itemIndex: number, arrayLength: number) => itemIndex + 1 === arrayLength;

export const calcNewSessionId = (min: number, max: number) =>
	// (sessions: ISession[]) => sessions.reduce((acc, session) => (Number(session.id) > acc ? Number(session.id) : acc), 0) + 1;
	Math.floor(Math.random() * (max - min) + min);

export const sessionsByDate = (a: ISession, b: ISession) =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

export const insertSpaceInTheMiddle = (string: string) =>
	string.substring(0, 4) + " " + string.replace(" ", "").substring(4, string.length);
