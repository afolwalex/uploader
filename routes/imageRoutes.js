const express = require("express");
const asyncHandler = require("express-async-handler");
const pool = require("../db");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const pageNumber = req.query.pageNumber || 1;
		const pageSize = 9;

		const skip = pageSize * (pageNumber - 1);

		const count = await pool.query(`SELECT * FROM images`);

		const images = await pool.query(
			`SELECT * FROM images ORDER BY id DESC OFFSET ${skip} LIMIT ${pageSize}`
		);

		res.json({
			status: "ok",
			data: {
				images: images.rows,
				meta: {
					total: count.rowCount,
					page: pageNumber,
					pages: Math.ceil(count.rowCount / pageSize),
				},
			},
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
