const connection = require("../database/connection.js")
const Tasks = require("../database/models/tasks.js")

	
async function createTask(user_id, name, deadline_date, deadline_time, description, returnId) {
	Tasks.init(connection)

	try {
		const task = await Tasks.create(
			{
				user_id: user_id,
				author: author,
				name: name,
				deadline_date: deadline_date,
				deadline_time: deadline_time,
				description: description,
			}
		)

		if (returnId == true) {
			return task.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getTaskById(id) {
	Tasks.init(connection)

	try {
		const task = await Tasks.findByPk(id)

		return task
	}
	catch ({ message }) {
		return null
	}
}

async function getTaskIdByName(name) {
	Tasks.init(connection)

	try {
		const task = await Tasks.findOne({
			where: {
				name: name
			}
		})

		return task.id
	}
	catch ({ message }) {
		return null
	}
}

async function updateTask(task, user_id, name, deadline_date, deadline_time, description) {
	Tasks.init(connection)

	try {
		if (user_id) { task.user_id = user_id }
		if (name) { task.name = name }
		if (deadline_date) { task.deadline_date = deadline_date }
		if (deadline_time) { task.deadline_time = deadline_time }
		if (description) { task.description = description }

		await task.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteTask(task) {
	Tasks.init(connection)

	try {
		await task.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createTask, getTaskById, getTaskIdByName, updateTask, deleteTask }
