
(async () => {

	const database = require('./connection.js')
	const queryInterface = database.getQueryInterface()
	const { Sequelize } = require('sequelize')

	/* database tables creation */
	const createUsers = require('./models/users.js')
	const createUserPreferences = require('./models/user_preferences.js')
	const createProjects = require('./models/projects.js')
	const createProjTasks = require('./models/proj_tasks.js')
	const createTasks = require('./models/tasks.js')
	const createBibliography = require('./models/bibliography.js')
	await database.sync()

	/* database tables relations */
	//createUserPreferences.hasOne(createUsers, { foreignKey: 'user_id' })
	/*queryInterface.changeColumn('user_preferences', 'user_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		foreignKey: true,
		references: { 
			model: 'users', // table name
			key: 'id' // column name
		}
	})
	await database.sync()*/

	/* database tables insertions */
	const insertUsers = require('./seeders/users.js')
	const insertUserPreferences = require('./seeders/user_preferences.js')
	const insertProjects = require('./seeders/projects.js')
	const insertProjTasks = require('./seeders/proj_tasks.js')
	const insertTasks = require('./seeders/tasks.js')
	const insertBibliography = require('./seeders/bibliography.js')
	await database.sync()

})();
