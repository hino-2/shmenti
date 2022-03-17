import { ISession } from "../Api/Session/interfaces";

export const isLastItem = (itemIndex: number, arrayLength: number) =>
  itemIndex + 1 === arrayLength;

export const calcNewSessionId = (sessions: ISession[]) =>
  sessions.reduce(
    (acc, session) => (Number(session.id) > acc ? Number(session.id) : acc),
    0
  ) + 1;

export const sessionsByDate = (a: ISession, b: ISession) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();
