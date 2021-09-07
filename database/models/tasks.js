const Sequelize = require('sequelize')
const database = require("../connection.js")


const tasks = database.define('tasks', {
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
	deadline_date: {
		type: Sequelize.DATE
	},
	deadline_time: {
		type: Sequelize.TIME
	},
	description: {
		type: Sequelize.STRING(355)
	},
	//createdAt: Sequelize.DATE,
	//updatedAt: Sequelize.DATE
})


module.exports = tasks;