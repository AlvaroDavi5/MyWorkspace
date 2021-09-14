const connection = require("../database/connection.js")
const Projects = require("../database/models/projects.js")
const ProjTasks = require("../database/models/proj_tasks.js")


async function createProject(user_id, name, returnId) {
	Projects.init(connection)

	try {
		const project = await Projects.create(
			{
				user_id: user_id,
				name: name
			}
		)

		if (returnId == true) {
			return project.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getProjectById(id) {
	Projects.init(connection)

	try {
		const project = await Projects.findByPk(id)

		return project
	}
	catch ({ message }) {
		return null
	}
}

async function getProjectIdByName(name) {
	Projects.init(connection)

	try {
		const project = await Projects.findOne({
			where: {
				name: name
			}
		})

		return project.id
	}
	catch ({ message }) {
		return null
	}
}

async function updateProject(project, user_id, name) {
	Projects.init(connection)

	try {
		if (user_id) { project.user_id = user_id }
		if (name) { project.name = name }

		await project.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteProject(project) {
	Projects.init(connection)

	try {
		await project.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function createProjTask(proj_id, task_num, name, description, deadline, situation, was_finished, returnId) {
	Projects.init(connection)

	try {
		const proj_task = await ProjTasks.create(
			{
				proj_id: proj_id,
				task_num: task_num,
				name: name,
				description: description,
				deadline: deadline,
				situation: situation,
				was_finished: was_finished
			}
		)

		if (returnId == true) {
			return proj_task.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getProjTaskById(id) {
	ProjTasks.init(connection)

	try {
		const proj_task = await ProjTasks.findByPk(id)

		return proj_task
	}
	catch ({ message }) {
		return null
	}
}

async function getProjTaskIdByName(name) {
	ProjTasks.init(connection)

	try {
		const proj_task = await ProjTasks.findOne({
			where: {
				name: name
			}
		})

		return proj_task.id
	}
	catch ({ message }) {
		return null
	}
}

async function updateProjTask(proj_task, proj_id, task_num, name, description, deadline, situation, was_finished) {
	ProjTasks.init(connection)

	try {
		if (proj_id) { proj_task.proj_id = proj_id }
		if (task_num) { proj_task.task_num = task_num }
		if (name) { proj_task.name = name }
		if (description) { proj_task.description = description }
		if (deadline) { proj_task.deadline = deadline }
		if (situation) { proj_task.situation = situation }
		if (was_finished) { proj_task.was_finished = was_finished }

		await proj_task.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteProjTask(proj_task) {
	ProjTasks.init(connection)

	try {
		await proj_task.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createProject, getProjectById, getProjectIdByName, updateProject, deleteProject,
createProjTask, getProjTaskById, getProjTaskIdByName, updateProjTask, deleteProjTask }
