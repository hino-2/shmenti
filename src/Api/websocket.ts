import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export const WEBSOCKET_URL = "wss://i0q0t4o8a5.execute-api.eu-central-1.amazonaws.com/production";

export interface IWebSocketProps {
	sendJsonMessage?: SendJsonMessage;
	lastJsonMessage?: any;
}

export const setupWebSocketFetchQuestions = (cb: () => void, interval = 2000) => {
	setInterval(cb, interval);
};
