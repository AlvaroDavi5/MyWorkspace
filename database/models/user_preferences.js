const { Model, DataTypes } = require('sequelize')


class UserPreferences extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			image_path: DataTypes.STRING(255),
			default_theme: DataTypes.INTEGER
		},
		{ sequelize: connection }
		)
	}
}


module.exports = UserPreferences;
