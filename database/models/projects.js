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
	//createdAt: Sequelize.DATE,
	//updatedAt: Sequelize.DATE
})


module.exports = projects;
