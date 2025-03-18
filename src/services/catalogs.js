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
