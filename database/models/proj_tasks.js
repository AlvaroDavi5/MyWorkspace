const { Model, DataTypes } = require('sequelize')


class ProjTasks extends Model {
	static init(connection) {
		super.init({
			proj_id: DataTypes.INTEGER,
			task_num: DataTypes.INTEGER,
			name: DataTypes.STRING(100),
			description: DataTypes.STRING(355),
			deadline: DataTypes.DATE,
			situation: DataTypes.INTEGER,
			was_finished: DataTypes.BOOLEAN
		},
		{ sequelize: connection }
		)
	}
}


module.exports = ProjTasks;
