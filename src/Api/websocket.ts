import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export const WEBSOCKET_URL =
  "wss://i0q0t4o8a5.execute-api.eu-central-1.amazonaws.com/production";

export enum WSMessageTypes {
  newQuestion = "newQuestion",
  updateQuestion = "updateQuestion",
}

// const FIVE_MINUTES = 1000 * 60 * 5;

export interface IWebSocketProps {
  sendJsonMessage?: SendJsonMessage;
  lastJsonMessage?: any;
}

// export const setupWebSocketFetchQuestions = (cb: () => void, interval = FIVE_MINUTES) => {
// 	setInterval(cb, interval);
// };

export const useWebsocket = (sessionId: string) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WEBSOCKET_URL}?sessionId=${sessionId}`,
    {
      onMessage: (event: MessageEvent) => {
        console.log(event);
        try {
          const messageData = JSON.parse(event.data);

          if (messageData.type === "ping") {
            sendJsonMessage({ action: "pong" });
          }
        } catch (error) {
          console.log(
            `Error parsing event's data. Event: ${event}. Error: ${error}`
          );
        }
      },
      onOpen: () => console.log("Websocket opened"),
      shouldReconnect: () => true,
    }
  );

  return { sendJsonMessage, lastJsonMessage };
};
