require("dotenv").config();
const Pool = require("pg").Pool;

const proConfig = {
	connectionString: process.env.DATABASE_URL,
};

const devConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
};

const pool = new Pool(process.env.DATABASE_URL ? proConfig : devConfig);

module.exports = pool;
