const Sequelize = require('sequelize')
const database = require('../connection.js')


const Users = database.define('users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING(85),
		allowNull: false
	},
	email: {
		type: Sequelize.STRING(60),
		allowNull: false
	},
	password: {
		type: Sequelize.STRING(18),
		allowNull: false
	},
	phone: {
		type: Sequelize.STRING(14)
	},
	cpf: {
		type: Sequelize.STRING(18)
	},
	uf: {
		type: Sequelize.STRING(2)
	},
	preferences: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	//created_at: Sequelize.DATE,
	//updated_at: Sequelize.DATE
})


module.exports = Users;
