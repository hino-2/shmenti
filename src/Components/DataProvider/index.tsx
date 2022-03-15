import { useState, useEffect, Children, cloneElement } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { fetchSessionById } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import {
  setupWebSocketFetchQuestions,
  WEBSOCKET_URL,
} from "../../Api/websocket";

interface IProviderProps {
  children: JSX.Element[];
}

export const DataProvider = ({ children }: IProviderProps) => {
  const { sessionId = "" } = useParams();

  const [session, setSession] = useState<ISession | null>();

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WEBSOCKET_URL}?sessionId=${sessionId}`,
    {
      onOpen: () => console.log("Websocket opened"),
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    fetchSessionById(sessionId).then((session) => setSession(session));

    setupWebSocketFetchQuestions(() => {
      sendJsonMessage({ action: "ping" });
    });
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
