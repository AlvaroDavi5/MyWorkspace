const Sequelize = require('sequelize')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/../.env.development.local'})


/* connecting to a database */
/* passing Parameters separately (other dialects) */
const sequelize = new Sequelize(
	process.env.DB_NAME, // database name
	process.env.DB_USERNAME, // database username
	process.env.DB_PASSWORD, // database password
	{
		host: process.env.DB_HOST,
		charset: 'utf8',
		dialect: process.env.DB_DBMS_NAME, // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
		port: process.env.DB_PORT,
		define: {
			timestamps: true // to createdAt and updatedAt
		}
	}
);
/* passing a connection URI - example for postgres */
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


/* testing the connection */
try {
	sequelize.authenticate();
	console.log('Database connection has been established successfully.');
}
catch (error) {
	console.error('Unable to connect to the database: ', error);
}


/* closing connection */
//sequelize.close()


module.exports = sequelize;
