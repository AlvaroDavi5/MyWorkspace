const { Model, DataTypes } = require('sequelize')


// EcmaScript 6 format
class Users extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING(85),
			email: DataTypes.STRING(60),
			password: DataTypes.STRING(65),
			phone: DataTypes.STRING(14),
			cpf: DataTypes.STRING(18),
			uf: DataTypes.STRING(2)
		},
		{ sequelize: connection }
		)
	}

	static associate(models) {
		this.hasOne(models.UserPreferences, {foreignKey: 'user_id', targetKey: 'id', as: 'preference'})
		this.hasMany(models.Projects, {foreignKey: 'user_id', targetKey: 'id', as: 'projects'})
		this.hasMany(models.Tasks, {foreignKey: 'user_id', targetKey: 'id', as: 'tasks'})
		this.hasMany(models.Bibliographies, {foreignKey: 'user_id', targetKey: 'id', as: 'bibliographies'})
	}
}


module.exports = Users;
