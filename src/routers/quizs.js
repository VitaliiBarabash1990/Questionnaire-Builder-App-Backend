import { Router } from "express";
import {
	createQuizController,
	deleteQuizController,
	getQuizByIdController,
	getQuizsController,
	patchQuizController,
	upsertQuizController,
} from "../controllers/quizs.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createQuizSchema, updateQuizSchema } from "../validation/quizs.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createCatalog } from "../controllers/catalogs.js";

const router = Router();

router.get("/catalogs", createCatalog);

router.get("/quizs", ctrlWrapper(getQuizsController));

router.get("/quizs/:quizId", isValidId, ctrlWrapper(getQuizByIdController));

router.post(
	"/quizs",
	validateBody(createQuizSchema),
	ctrlWrapper(createQuizController)
);

router.delete("/quizs/:quizId", isValidId, ctrlWrapper(deleteQuizController));

router.put(
	"/quizs/:quizId",
	isValidId,
	validateBody(createQuizSchema),
	ctrlWrapper(upsertQuizController)
);

router.patch(
	"/quizs/:quizId",
	isValidId,
	validateBody(updateQuizSchema),
	ctrlWrapper(patchQuizController)
);

export default router;
