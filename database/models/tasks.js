const { Model, DataTypes } = require('sequelize')


class Tasks extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			name: DataTypes.STRING(100),
			deadline_date: DataTypes.DATE,
			deadline_time: DataTypes.TIME,
			description: DataTypes.STRING(355)		
		},
		{ sequelize: connection }
		)
	}
}


module.exports = Tasks;
