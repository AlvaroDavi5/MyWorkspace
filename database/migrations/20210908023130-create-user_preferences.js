'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user_preferences', {
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
			image_path: {
				type: Sequelize.STRING(255)
			},
			default_theme: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable('user_preferences')
	}
}
