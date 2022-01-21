const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./middleware/error_handler");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/image", imageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);