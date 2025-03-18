import Joi from "joi";

export const createCatalogSchema = Joi.object({
	name: Joi.string().min(3).max(50).required().messages({
		"string.base": "Name should be a string",
		"string.min": "Name should have at least 3 characters",
		"string.max": "Name should have at most 50 characters",
		"any.required": "Name is required",
	}),
	description: Joi.string().min(10).max(500).required().messages({
		"string.base": "Description should be a string",
		"string.min": "Description should have at least 10 characters",
		"string.max": "Description should have at most 500 characters",
		"any.required": "Description is required",
	}),
});
