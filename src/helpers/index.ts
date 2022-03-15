import { ISession } from "../Api/Session/interfaces";

export const isLastItem = (itemIndex: number, arrayLength: number) =>
  itemIndex + 1 === arrayLength;

export const calcNewSessionId = (sessions: ISession[]) =>
  sessions.reduce(
    (acc, session) => (Number(session.id) > acc ? Number(session.id) : acc),
    0
  ) + 1;
