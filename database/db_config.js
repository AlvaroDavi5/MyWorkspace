const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+"/../.env.development.local"})


module.exports = {
	database: process.env.DB_NAME, // database name
	username: process.env.DB_USERNAME, // database username
	password: process.env.DB_PASSWORD, // database password
	host: process.env.DB_HOST,
	charset: 'utf8',
	dialect: process.env.DB_DBMS_NAME, // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
	port: process.env.DB_PORT,
	define: {
		timestamps: true, // to created_at and updated_at
		underscored: true // underscored name of fields
	}
}
