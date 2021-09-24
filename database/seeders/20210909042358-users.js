'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [
			{
				name: "Alvaro",
				email: "alvaro-alves@nomail.edu",
				password: "alvaro",
				phone: "27999999999",
				cpf: "000.123.111-60",
				uf: "BA"
			},
			{
				name: "Davi",
				email: "davi-santos@nomail.edu",
				password: "senha_da_nasa123",
				phone: "279898988998",
				cpf: "000.124.111-60",
				uf: "ES"
			}
		], {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {})
	}
}
