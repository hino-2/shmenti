import { IQuestion } from "../Questions/interfaces";

export interface ISession {
	id: number;
	date: string;
	name: string;
	questions: IQuestion[];
}
