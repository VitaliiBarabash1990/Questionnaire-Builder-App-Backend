import Joi from "joi";

export const createQuizSchema = Joi.object({
	question: Joi.string().min(5).max(200).required().messages({
		"string.base": "Question should be a string",
		"string.min": "Question should have at least 5 characters",
		"string.max": "Question should have at most 200 characters",
		"any.required": "Question is required",
	}),

	type: Joi.string().valid("text", "radio", "checkbox").required().messages({
		"string.base": "Type should be a string",
		"any.only": "Type must be one of 'text', 'radio', 'checkbox'",
		"any.required": "Type is required",
	}),

	answer: Joi.when("type", {
		is: "text",
		then: Joi.string().min(1).max(500).required().messages({
			"string.base": "Answer should be a string",
			"string.min": "Answer should not be empty",
			"string.max": "Answer should have at most 500 characters",
			"any.required": "Answer is required for text type",
		}),
		otherwise: Joi.forbidden(),
	}),

	radio: Joi.when("type", {
		is: "radio",
		then: Joi.object({
			choice: Joi.string().required().messages({
				"string.base": "Choice should be a string",
				"any.required": "Choice is required",
			}),
			answers: Joi.array()
				.items(
					Joi.object({
						answer: Joi.string().min(1).required().messages({
							"string.base": "Answer should be a string",
							"string.min": "Answer should not be empty",
							"any.required": "Answer is required",
						}),
						isCorrect: Joi.boolean().default(false),
					})
				)
				.min(2)
				.max(4)
				.required()
				.messages({
					"array.min": "Radio questions must have at least 2 options",
					"array.max": "Radio questions can have at most 4 options",
					"any.required": "Answers are required for radio type",
				}),
		}).required(),
		otherwise: Joi.forbidden(),
	}),

	checkbox: Joi.when("type", {
		is: "checkbox",
		then: Joi.object({
			choices: Joi.array()
				.items(
					Joi.object({
						answer: Joi.string().min(1).required().messages({
							"string.base": "Answer should be a string",
							"string.min": "Answer should not be empty",
							"any.required": "Answer is required",
						}),
						isChecked: Joi.boolean().default(false),
					})
				)
				.min(2)
				.max(4)
				.required()
				.messages({
					"array.min": "Checkbox questions must have at least 2 options",
					"array.max": "Checkbox questions can have at most 4 options",
					"any.required": "Choices are required for checkbox type",
				}),
		}).required(),
		otherwise: Joi.forbidden(),
	}),
});

export const updateQuizSchema = createQuizSchema.fork(
	["question", "type", "answer", "radio", "checkbox"],
	(schema) => schema.optional()
);
