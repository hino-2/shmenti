export interface IQuestion {
  id: string;
  sessionId: string;
  text: string;
  isAnswered: boolean;
  timestamp: number;
}
