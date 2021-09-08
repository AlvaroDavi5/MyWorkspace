const Sequelize = require('sequelize')
const database = require("../connection.js")


const projects = database.define('projects', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(100)
	},
	created_at: {
		type: Sequelize.DATE,
		allowNull: false
	},
	updated_at: {
		type: Sequelize.DATE,
		allowNull: false
	}
})


module.exports = projects;
