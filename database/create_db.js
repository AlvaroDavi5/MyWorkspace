
(async () => {

	const database = require('./connection.js')
	const Users = require('./models/users.js')
	const UserPreferences = require('./models/user_preferences.js')
	await database.sync();

})();

