import createHttpError from "http-errors";
import {
	createQuiz,
	deleteQuiz,
	getAllQuizs,
	getQuizById,
	updateQuiz,
} from "../services/quizs.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getQuizsController = async (req, res) => {
	const { page, perPage } = parsePaginationParams(req.query);

	const { sortBy, sortOrder } = parseSortParams(req.query);

	const filter = parseFilterParams(req.query);

	const quizs = await getAllQuizs({
		page,
		perPage,
		sortBy,
		sortOrder,
		filter,
	});
	res.json({
		status: 200,
		message: "Successfully found quizs!",
		data: quizs,
	});
};

export const getQuizByIdController = async (req, res) => {
	const { quizId } = req.params;
	const quiz = await getQuizById(quizId);

	if (!quiz) {
		throw createHttpError(404, "Quiz not found");
	}

	res.json({
		status: 200,
		message: `Successfully found quiz with id ${quizId}!`,
		data: quiz,
	});
};

export const createQuizController = async (req, res) => {
	const quiz = await createQuiz(req.body);

	res.status(201).json({
		status: 201,
		message: "Successfully created a quiz!",
		data: quiz,
	});
};

export const deleteQuizController = async (req, res, next) => {
	const { quizId } = req.params;

	const quiz = await deleteQuiz(quizId);

	if (!quiz) {
		next(createHttpError(404, `Quiz not found`));
		return;
	}

	res.status(204).send();
};

export const upsertQuizController = async (req, res, next) => {
	const { quizId } = req.params;

	const result = await updateQuiz(quizId, req.body, { upsert: true });

	if (!result) {
		next(createHttpError(404, `Quiz not found`));
		return;
	}

	const status = result.isNew ? 201 : 200;

	res.status(status).json({
		status,
		message: `Succsessfully upserted a quiz!`,
		data: result.student,
	});
};

export const patchQuizController = async (req, res, next) => {
	const { quizId } = req.params;

	const result = await updateQuiz(quizId, req.body);

	if (!result) {
		next(createHttpError(404, `Quiz not found`));
		return;
	}

	res.json({
		status: 200,
		message: `Succsessfully patched a quiz!`,
		data: result.quiz,
	});
};
