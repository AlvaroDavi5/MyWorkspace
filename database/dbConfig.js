const globals_variables = require("../config/globals/modifiable")
const static_dotenv = require("../config/globals/static_dotenv")


const config = {
	database: static_dotenv.db.database,
	username: static_dotenv.db.username,
	password: static_dotenv.db.password,
	host: globals_variables.db.host,
	charset: 'utf8',
	dialect: static_dotenv.db.dialect,
	/*
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false
		}
	}
	*/
	port: process.env.DB_PORT,
	define: {
		underscored: true,
		timestamps: true,
		freezeTableName: false
	}
}


module.exports = config
