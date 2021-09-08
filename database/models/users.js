const { Model, DataTypes } = require('sequelize')


// EcmaScript 6 format
class Users extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING(85),
			email: DataTypes.STRING(60),
			password: DataTypes.STRING(18),
			phone: DataTypes.STRING(14),
			cpf: DataTypes.STRING(18),
			uf: DataTypes.STRING(2),
			preferences: DataTypes.INTEGER		
		},
		{ sequelize: connection }
		)
	}
}


module.exports = Users;
