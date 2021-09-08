const { Sequelize } = require('sequelize')
const DBConfig = require("./db_config.js")
const Users = require("./models/users.js")
const UserPreferences = require("./models/user_preferences.js")
const Projects = require("./models/projects.js")
const ProjTasks = require("./models/proj_tasks.js")
const Tasks = require("./models/tasks.js")
const Bibliographies = require("./models/bibliographies.js")


const connection = new Sequelize(DBConfig)

/* database tables creation */
Users.init(connection)
UserPreferences.init(connection)
Projects.init(connection)
ProjTasks.init(connection)
Tasks.init(connection)
Bibliographies.init(connection)

/* database tables relations */
/* database tables insertions */


module.exports = connection;

/*
(async () => {
	try {
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

	const insertUsers = require("./seeders/users.js")
	const insertUserPreferences = require("./seeders/user_preferences.js")
	const insertProjects = require("./seeders/projects.js")
	const insertProjTasks = require("./seeders/proj_tasks.js")
	const insertTasks = require("./seeders/tasks.js")
	const insertBibliographies = require("./seeders/bibliographies.js")
	await database.sync()

})();
*/
