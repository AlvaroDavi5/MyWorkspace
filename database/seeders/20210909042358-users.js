'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [
			{
				name: "Alvaro",
				email: "alvaro-alves@nomail.edu",
				password: "senha_da_nasa123",
				phone: "27999999999",
				cpf: "000.123.111-60",
				uf: "BA"
			}
		], {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {})
	}
}
