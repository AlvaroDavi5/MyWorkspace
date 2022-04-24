import Tasks from "../database/models/tasks"


async function createTask(user_id: number, name: string, deadline_date: Date, deadline_time: Date, description: string, return_id: boolean): Promise<number | boolean> {

	try {
		const task = await Tasks.create(
			{
				user_id: user_id,
				name: name,
				deadline_date: deadline_date,
				deadline_time: deadline_time,
				description: description,
			}
		)

		if (return_id == true) {
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

async function getTaskById(id: number): Promise<Tasks | null> {

	try {
		const task = await Tasks.findByPk(id)

		return task
	}
	catch ({ message }) {
		return null
	}
}

async function getAllTasks(): Promise<Tasks[] | Tasks | null> {

	try {
		const tasks = await Tasks.findAll()

		return tasks
	}
	catch ({ message }) {
		return null
	}
}

async function getTasksByUserId(user_id: number): Promise<Tasks[]> {

	try {
		const tasks = await Tasks.findAll({
			where: {
				user_id: user_id
			}
		})

		return tasks
	}
	catch ({ message }) {
		return []
	}
}

async function getTaskIdByUserId(user_id: number): Promise<number | null> {

	try {
		const task = await Tasks.findOne({
			where: {
				user_id: user_id
			}
		})

		if (task?.id) {
			return task.id
		}
		else {
			return 0
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updateTask(task: Tasks | undefined | null, user_id: number, name: string, deadline_date: Date, deadline_time: Date, description: string): Promise<boolean> {

	try {
		if (user_id && task) { task.user_id = user_id }
		if (name && task) { task.name = name }
		if (deadline_date && task) { task.deadline_date = deadline_date }
		if (deadline_time && task) { task.deadline_time = deadline_time }
		if (description && task) { task.description = description }

		await task?.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteTask(task: Tasks | undefined | null): Promise<boolean> {

	try {
		await task?.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createTask, getTaskById, getAllTasks, getTasksByUserId, getTaskIdByUserId, updateTask, deleteTask }
