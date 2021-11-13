const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+"/../env/.env.development.local"})


module.exports = {
	database: process.env.DB_NAME, // database name
	username: process.env.DB_USERNAME, // database username
	password: process.env.DB_PASSWORD, // database password
	host: process.env.DB_HOST,
	charset: 'utf8',
	dialect: process.env.DB_DBMS_NAME, // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
	port: process.env.DB_PORT,
	define: {
		underscored: true, // underscored name of fields
		timestamps: true, // to created_at and updated_at
		freezeTableName: false // not set table names on plural
	}
}
