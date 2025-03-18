const parseQuizType = (quizType) => {
	const isString = typeof quizType === "string";
	if (!isString) return;
	const isQuizType = (quizType) =>
		["work", "home", "personal"].includes(quizType);

	if (isQuizType(quizType)) return quizType;
};

const parseIsFavourite = (IsFavourite) => {
	if (typeof IsFavourite === "boolean") return IsFavourite;
	if (typeof IsFavourite === "string") {
		if (IsFavourite.toLowerCase() === "true") return true;
		if (IsFavourite.toLowerCase() === "false") return false;
	}
	return;
};

export const parseFilterParams = (query) => {
	const { quizType, isFavourite } = query;

	const parsedQuizType = parseQuizType(quizType);
	const parsedIsFafourite = parseIsFavourite(isFavourite);

	return {
		quizType: parsedQuizType,
		isFavourite: parsedIsFafourite,
	};
};
