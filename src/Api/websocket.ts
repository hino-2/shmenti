import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export const WEBSOCKET_URL = "wss://i0q0t4o8a5.execute-api.eu-central-1.amazonaws.com/production";

export enum WSMessageTypes {
	newQuestion = "newQuestion",
	updateQuestion = "updateQuestion",
	ping = "ping",
}

export interface IWebSocketProps {
	sendJsonMessage?: SendJsonMessage;
	lastJsonMessage?: any;
}

export const useWebsocket = (sessionId: string) => {
	const { sendJsonMessage, lastJsonMessage } = useWebSocket(
		`${WEBSOCKET_URL}?sessionId=${sessionId}`,
		{
			onMessage: (event: MessageEvent) => {
				try {
					const messageData = JSON.parse(event.data);

					if (messageData.type === WSMessageTypes.ping) {
						sendJsonMessage({ action: "pong" });
					}
				} catch (error) {
					console.log(`Error parsing event's data. Event: ${event}. Error: ${error}`);
				}
			},
			shouldReconnect: () => true,
		}
	);

	console.log("lastJsonMessage", lastJsonMessage);

	return { sendJsonMessage, lastJsonMessage };
};
