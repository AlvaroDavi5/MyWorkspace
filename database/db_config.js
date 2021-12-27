const globals_variables = require("../config/globals/modifiable.js")
const static_dotenv = require("../config/globals/static_dotenv.js")


module.exports = {
	database: static_dotenv.db.database, // database name
	username: static_dotenv.db.username, // database username
	password: static_dotenv.db.password, // database password
	host: globals_variables.db.host, // database host (change to 'db' if you use docker or to 'localhost' if you use local machine)
	charset: 'utf8', // database charset encoding
	dialect: static_dotenv.db.dialect, // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
	port: static_dotenv.db.port, // database port
	define: {
		underscored: true, // underscored name of fields
		timestamps: true, // to created_at and updated_at
		freezeTableName: false // not set table names on plural
	}
}
