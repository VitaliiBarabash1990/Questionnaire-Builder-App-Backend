import { SORT_ORDER } from "../constants/index.js";
import { QuizsCollection } from "../db/models/quizs.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllQuizs = async ({
	page = 1,
	perPage = 10,
	sortOrder = SORT_ORDER.ASC,
	sortBy = "_id",
	filter = {},
}) => {
	const limit = perPage;
	const skip = (page - 1) * perPage;

	const quizsQuery = QuizsCollection.find();

	if (filter.quizType) {
		quizsQuery.where("quizType").equals(filter.quizType);
	}

	if (filter.isFavourite !== undefined) {
		quizsQuery.where("isFavourite").equals(filter.isFavourite);
	}

	const [quizsCount, quizs] = await Promise.all([
		QuizsCollection.find().merge(quizsQuery).countDocuments(),
		quizsQuery
			.skip(skip)
			.limit(limit)
			.sort({ [sortBy]: sortOrder })
			.exec(),
	]);

	const paginationData = calculatePaginationData(quizsCount, perPage, page);

	return {
		data: quizs,
		...paginationData,
	};
};

export const getQuizById = async (quizId) => {
	const quiz = await QuizsCollection.findById(quizId);
	return quiz;
};

export const createQuiz = async (payload) => {
	const quiz = await QuizsCollection.create(payload);
	return quiz;
};

export const deleteQuiz = async (quizId) => {
	const quiz = await QuizsCollection.findOneAndDelete({
		_id: quizId,
	});
	return quiz;
};

export const updateQuiz = async (quizId, payload, options = {}) => {
	const rawResult = await QuizsCollection.findOneAndUpdate(
		{ _id: quizId },
		payload,
		{ new: true, includeResultMetadata: true, ...options }
	);

	if (!rawResult || !rawResult.value) return null;

	return {
		quiz: rawResult.value,
		isNew: Boolean(rawResult?.lastErrorObject?.upserted),
	};
};
