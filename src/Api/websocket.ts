import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export const WEBSOCKET_URL = "wss://i0q0t4o8a5.execute-api.eu-central-1.amazonaws.com/production";

const FIVE_MINUTES = 1000 * 60 * 5;

export interface IWebSocketProps {
	sendJsonMessage?: SendJsonMessage;
	lastJsonMessage?: any;
}

export const setupWebSocketFetchQuestions = (cb: () => void, interval = FIVE_MINUTES) => {
	setInterval(cb, interval);
};
