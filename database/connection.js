const Sequelize = require('sequelize')
const DBConfig = require("./db_config.js")


/* connecting to a database */
/* passing Parameters separately (other dialects) */
const connection = new Sequelize(DBConfig)
/* passing a connection URI - example for postgres */
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


/* testing the connection */
try {
	await connection.authenticate()
	console.log('Database connection has been established successfully.')
}
catch (error) {
	console.error('Unable to connect to the database: ', error)
}


/* closing connection */
//connection.close()


module.exports = connection;
