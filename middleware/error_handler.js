const errorHandler = (err, req, res, next) => {
	switch (true) {
		case typeof err === "string":
			// custom application error
			const is404 = err.toLowerCase().endsWith("not found");
			const statusCode = is404 ? 404 : 400;
			return res.status(statusCode).json({ message: err });
		case err.name === "ValidationError":
			// mongoose validation error
			return res.status(400).json({ message: err.message });
		case err.name === "Unauthorized":
			// jwt authentication error
			return res.status(401).json({ message: "Unauthorized" });
		case err.message === "Unauthorized":
			// jwt authentication error
			return res.status(401).json({ message: "Not Authorized" });
		case err.message.endsWith("not found"):
			// Not found error
			return res.status(404).json({ message: err.message });
		default:
			return res.status(500).json({ message: err.message });
	}
};

module.exports = errorHandler;
