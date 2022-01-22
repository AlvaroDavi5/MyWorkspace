const connection = require("./connection.js")
const Users = require("./models/users.js")
const UserPreferences = require("./models/user_preferences.js")
const Projects = require("./models/projects.js")
const ProjTasks = require("./models/proj_tasks.js")
const Tasks = require("./models/tasks.js")
const Bibliographies = require("./models/bibliographies.js")


/* database tables creation */
Users.init(connection)
UserPreferences.init(connection)
Projects.init(connection)
ProjTasks.init(connection)
Tasks.init(connection)
Bibliographies.init(connection)


/* database tables associations */
/**
  * ?    Relations
  * @belongsTo - One-to-One, source -> target
  * @hasOne - One-to-One, target -> source
  * @hasMany - One-to-Many, target -> source
  * @belongsToMany - Many-to-Many, source -> target
**/
Users.associate(connection.models) // relations in each model
UserPreferences.associate(connection.models)
Projects.associate(connection.models)
ProjTasks.associate(connection.models) // passing all models from connection
Tasks.associate(connection.models)
Bibliographies.associate(connection.models)


module.exports = connection;
