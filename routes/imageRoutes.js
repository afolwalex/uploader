const express = require("express");
const asyncHandler = require("express-async-handler");
const pool = require("../db");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const images = await pool.query("SELECT * FROM images");
		console.log(images.rowCount);
		res.json({
			status: "ok",
			images: images.rows,
		});
	})
);

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { type, value } = req.body;
		const createImage = await pool.query(
			"INSERT INTO images (image_type, image_value) VALUES ($1, $2) RETURNING *",
			[type, value]
		);

		if (createImage) {
			res.json({
				status: "ok",
				image: createImage.rows[0],
			});
		} else {
			throw new Error("Unable to save Image");
		}
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const deleteImage = await pool.query(
			"DELETE FROM images WHERE id = $1",
			[id]
		);

		if (deleteImage) {
			res.json({
				status: "ok",
				image: "Deleted",
			});
		} else {
			throw new Error("Unable to delete Image");
		}
	})
);

module.exports = router;