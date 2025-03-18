import { Schema, model } from "mongoose";

const catalogSchema = new Schema(
	{
		name: { type: String, required: true, minlength: 3, maxlength: 50 },
		description: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 500,
		},
	},
	{ timestamps: true, versionKey: false }
);

export const Catalog = model("Catalog", catalogSchema);
