import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
	const { quizId } = req.params;
	if (!isValidObjectId(quizId)) {
		throw createHttpError(400, "Id is not valid!");
	}
	next();
};
