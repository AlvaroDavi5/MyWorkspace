const { Model, DataTypes } = require('sequelize')


class Tasks extends Model {
	static init(connection) {
		super.init(
			{
				user_id: DataTypes.INTEGER,
				name: DataTypes.STRING(100),
				deadline_date: DataTypes.DATE,
				deadline_time: DataTypes.TIME,
				description: DataTypes.STRING(355)
			},
			{
				modelName: 'Tasks',
				tableName: 'tasks',
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


module.exports = Tasks
