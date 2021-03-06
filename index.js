const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./middleware/error_handler");

const app = express();

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/api/image", imageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);
