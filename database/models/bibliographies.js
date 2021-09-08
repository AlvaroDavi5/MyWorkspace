const { Model, DataTypes } = require('sequelize')


class Bibliographies extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			author: DataTypes.STRING(85),
			name: DataTypes.STRING(325),
			publication_date: DataTypes.DATE
		},
		{ sequelize: connection }
		)
	}
}


module.exports = Bibliographies;
