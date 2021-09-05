const Sequelize = require('sequelize')
const database = require('../connection.js')


const UserPreferences = database.define('user_preferences', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		model: 'users', // table name
		key: 'id' // column name
	},
	image_path: {
		type: Sequelize.STRING(255)
	},
	default_theme: {
		type: Sequelize.INTEGER
	},
	//created_at: Sequelize.DATE,
	//updated_at: Sequelize.DATE
})


module.exports = UserPreferences;


/*
const queryInterface = database.getQueryInterface()

queryInterface.changeColumn('users', 'preferences', {
	type: Sequelize.INTEGER,
	allowNull: false,
	model: 'user_preferences',
	key: 'id'
});
*/
