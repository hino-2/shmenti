import { useState, useEffect, Children, cloneElement } from "react";
import { useParams } from "react-router-dom";
import { fetchSessionById } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import {
  // setupWebSocketFetchQuestions,
  useWebsocket,
} from "../../Api/websocket";

interface IProviderProps {
  children: JSX.Element[];
}

export const DataProvider = ({ children }: IProviderProps) => {
  const { sessionId = "" } = useParams();

  const [session, setSession] = useState<ISession | null>();

  const { sendJsonMessage, lastJsonMessage } = useWebsocket(sessionId);

  useEffect(() => {
    fetchSessionById(sessionId).then((session) => setSession(session));

    // setupWebSocketFetchQuestions(() => {
    //   sendJsonMessage({ action: "ping" });
    // });
  }, [sendJsonMessage, sessionId]);

  useEffect(() => {
    if (lastJsonMessage?.Items?.[0]) {
      setSession(lastJsonMessage.Items[0]);
    }
  }, [lastJsonMessage]);

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, {
          session,
          lastJsonMessage,
          sendJsonMessage,
        })
      )}
    </>
  );
};
