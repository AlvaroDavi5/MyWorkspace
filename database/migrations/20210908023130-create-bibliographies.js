'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('bibliographies', {
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
			author: {
				type: Sequelize.STRING(85),
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(325),
				allowNull: false
			},
			publication_date: {
				type: Sequelize.DATE
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('bibliographies')
	}
}
