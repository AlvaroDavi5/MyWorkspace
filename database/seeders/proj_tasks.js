const proj_tasks = require("../models/proj_tasks.js")


const insert = proj_tasks.create({
	proj_id: 1,
	task_num: 02,
	name: "Criar Banco de Dados",
	description: "Sem database, sem dados. dãã!!!",
	deadline: "2021-09-25",
	situation: 3,
	was_finished: 1
})


module.exports = insert;
