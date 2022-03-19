import { ISession } from "../Api/Session/interfaces";

export const calcNewSessionId = (min: number, max: number) =>
	// (sessions: ISession[]) => sessions.reduce((acc, session) => (Number(session.id) > acc ? Number(session.id) : acc), 0) + 1;
	Math.floor(Math.random() * (max - min) + min);

export const sessionsByDate = (a: ISession, b: ISession) =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

export const insertSpaceInTheMiddle = (string: string) =>
	string.substring(0, 4) + " " + string.replace(" ", "").substring(4, string.length);

export const getLocalStorageQuestionId = (questionId: string | number) =>
	`shmenti_question_${questionId}`;

/** unused */
export const getLikedQuestionsFromLocalStorage = (): Record<string, true> => {
	try {
		const likedQuestions = JSON.parse(localStorage.getItem("likedQuestions") ?? "{}");

		if (typeof likedQuestions === "object") {
			return likedQuestions;
		} else {
			throw new Error("Invalid likedQuestions object in localStorage");
		}
	} catch (error) {
		console.log(
			`Error parsing localStorage: ${error}. Clearing localStorage.likedQuestions will help.`
		);

		return {};
	}
};

export const getIsLikedQuestion = (questionId: string | number) => {
	const qId = getLocalStorageQuestionId(questionId);

	try {
		const isLikedQuestion = Boolean(localStorage.getItem(qId));

		return isLikedQuestion;
	} catch (error) {
		console.log(
			`Error parsing localStorage: ${error}. Clearing localStorage.likedQuestions will help.`
		);

		return false;
	}
};

export const setIsLikedQuestion = (questionId: string | number) => {
	localStorage.setItem(getLocalStorageQuestionId(questionId), String(true));
};

export const setIsNotLikedQuestion = (questionId: string | number) => {
	localStorage.removeItem(getLocalStorageQuestionId(questionId));
};
