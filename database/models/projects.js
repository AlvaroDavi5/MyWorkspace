const { Model, DataTypes } = require('sequelize')


class Projects extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			name: DataTypes.STRING(100)		
		},
		{ sequelize: connection }
		)
	}

	static associate(models) {
		this.belongsTo(models.Users, {foreignKey: 'user_id', targetKey: 'id', as: 'user'})
		this.hasMany(models.ProjTasks, {foreignKey: 'proj_id', targetKey: 'id', as: 'proj_tasks'})
	}
}


module.exports = Projects
