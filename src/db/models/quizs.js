import { model, Schema } from "mongoose";

const quizsSchema = new Schema(
	{
		question: { type: String, required: true },
		type: {
			type: String,
			enum: ["text", "radio", "checkbox"],
			required: true,
			default: "text",
		},
		answer: { type: String },

		radio: {
			choice: { type: String },
			answers: [
				{
					answer: { type: String },
					isCorrect: { type: Boolean, default: false },
				},
			],
		},

		checkbox: {
			choices: [
				{
					answer: { type: String },
					isChecked: { type: Boolean, default: false },
				},
			],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const QuizsCollection = model("quizs", quizsSchema);
