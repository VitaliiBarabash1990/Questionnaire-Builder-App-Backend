import { Catalog } from "../db/models/catalogs.js";
import { createCatalogSchema } from "../validation/catalogs.js";

export const createCatalog = async (req, res) => {
	try {
		const { error } = createCatalogSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const newCatalog = await Catalog.create(req.body);
		res.status(201).json(newCatalog);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};
