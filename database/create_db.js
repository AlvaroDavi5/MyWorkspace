
(async () => {

	const database = require('./connection.js')

	const createUsers = require('./models/users.js')
	const createUserPreferences = require('./models/user_preferences.js')

	await database.sync()

	const insertUsers = require('./seeders/users.js')
	const insertUserPreferences = require('./seeders/user_preferences.js')

	await database.sync()

})();
