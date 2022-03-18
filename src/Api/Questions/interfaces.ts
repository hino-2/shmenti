export interface IQuestion {
  id: number;
  sessionId: string;
  text: string;
  isAnswered: boolean;
  timestamp: number;
  likes: number;
}
