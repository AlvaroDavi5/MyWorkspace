const Sequelize = require('sequelize')
require('dotenv')


/* connecting to a database */
console.log(process.env.DB_PASSWORD)
/* passing Parameters separately (other dialects) */
const sequelize = new Sequelize(
	process.env.DB_NAME, // database name
	process.env.DB_USERNAME, // database username
	process.env.DB_PASSWORD, // database password
	{
		host: process.env.DB_HOST,
		charset: 'utf8',
		dialect: process.env.DB_DBMS_NAME, // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
		port: process.env.DB_PORT
	}
);
/* passing a connection URI - example for postgres */
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


/* testing the connection */
/*try {
	await sequelize.authenticate();
	console.log('Database connection has been established successfully.');
}
catch (error) {
	console.error('Unable to connect to the database: ', error);
}*/


/* closing connection */
//sequelize.close()


module.exports = sequelize;
