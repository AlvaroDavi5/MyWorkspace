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
		references: { 
			model: 'users', // table name
			key: 'id' // column name
		}
	},
	image_path: {
		type: Sequelize.STRING(255)
	},
	default_theme: {
		type: Sequelize.INTEGER
	},
	//createdAt: Sequelize.DATE,
	//updatedAt: Sequelize.DATE
})


module.exports = UserPreferences;
