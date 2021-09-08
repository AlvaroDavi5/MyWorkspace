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
}


module.exports = Projects;
