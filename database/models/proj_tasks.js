const Sequelize = require('sequelize')
const database = require("../connection.js")


const proj_tasks = database.define('proj_tasks', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	proj_id: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	task_num: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(100)
	},
	description: {
		type: Sequelize.STRING(355)
	},
	deadline: {
		type: Sequelize.DATE
	},
	situation: {
		type: Sequelize.INTEGER
	},
	was_finished: {
		type: Sequelize.BOOLEAN
	},
	//createdAt: Sequelize.DATE,
	//updatedAt: Sequelize.DATE
})


module.exports = proj_tasks;
