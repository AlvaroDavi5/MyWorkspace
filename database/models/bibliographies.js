const { Model, DataTypes } = require('sequelize')


class Bibliographies extends Model {
	static init(connection) {
		super.init(
			{
				user_id: DataTypes.INTEGER,
				author: DataTypes.STRING(85),
				name: DataTypes.STRING(325),
				publication_date: DataTypes.DATE
			},
			{
				modelName: 'Bibliographies',
				tableName: 'bibliographies',
				sequelize: connection
			}
		)
	}

	static associate(models) {
		this.belongsTo(
			models.Users,
			{
				foreignKey: 'user_id',
				targetKey: 'id',
				as: 'user'
			}
		)
	}
}


module.exports = Bibliographies
