const Users = require("./models/users.js");

(async () => {

	const database = require("./connection.js")
	const queryInterface = database.getQueryInterface()
	const { Sequelize } = require('sequelize')

	/* database tables creation */
	const createUsers = require("./models/users.js")
	const createUserPreferences = require("./models/user_preferences.js")
	const createProjects = require("./models/projects.js")
	const createProjTasks = require("./models/proj_tasks.js")
	const createTasks = require("./models/tasks.js")
	const createBibliographies = require("./models/bibliographies.js")
	await database.sync()

	/* database tables assossiations */
	try {
		/**
		* ?    Relations
		* @belongsTo - One-to-One, source -> target
		* @hasOne - One-to-One, target -> source
		* @hasMany - One-to-Many, target -> source
		* @belongsToMany - Many-to-Many, source -> target
		**/
		createUsers.hasOne(createUserPreferences, {foreignKey: 'user_id_fk', targetKey: 'id'})
		createUsers.hasMany(createProjects, {foreignKey: 'user_id_fk', targetKey: 'id'})
		createProjects.hasOne(createProjTasks , {foreignKey: 'proj_id_fk', targetKey: 'id'})
		createUsers.hasMany(createTasks, {foreignKey: 'user_id_fk', targetKey: 'id'})
		createUsers.hasMany(createBibliographies, {foreignKey: 'user_id_fk', targetKey: 'id'})

		await database.sync({force: true})
	}
	catch (error) {
		console.log(error);
	}

	/* database tables insertions */
	const insertUsers = require("./seeders/users.js")
	const insertUserPreferences = require("./seeders/user_preferences.js")
	const insertProjects = require("./seeders/projects.js")
	const insertProjTasks = require("./seeders/proj_tasks.js")
	const insertTasks = require("./seeders/tasks.js")
	const insertBibliographies = require("./seeders/bibliographies.js")
	await database.sync()

})();
