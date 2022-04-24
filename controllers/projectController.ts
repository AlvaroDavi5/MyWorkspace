import Projects from "../database/models/projects"
import ProjTasks from "../database/models/proj_tasks"


async function createProject(user_id: number, name: string): Promise<number | boolean> {

	try {
		const project = await Projects.create(
			{
				user_id: user_id,
				name: name
			}
		)

		return project.id
	}
	catch ({ message }) {
		return false
	}
}

async function getProjectById(id: number): Promise<Projects | null> {

	try {
		const project = await Projects.findByPk(id)

		return project
	}
	catch ({ message }) {
		return null
	}
}

async function getAllProjects(): Promise<Projects[]> {

	try {
		const projects = await Projects.findAll()

		return projects
	}
	catch ({ message }) {
		return []
	}
}

async function getProjectsByUserId(user_id: number): Promise<Projects[]> {

	try {
		const projects = await Projects.findAll({
			where: {
				user_id: user_id
			}
		})

		return projects
	}
	catch ({ message }) {
		return []
	}
}

async function getProjectIdByName(name: string): Promise<number | null> {

	try {
		const project = await Projects.findOne({
			where: {
				name: name
			}
		})

		if (project?.id) {
			return project.id
		}
		else {
			return 0
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updateProject(project: Projects | undefined | null, user_id: number, name: string): Promise<boolean> {

	try {
		if (user_id && project) { project.user_id = user_id }
		if (name && project) { project.name = name }

		await project?.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteProject(project: Projects | undefined | null): Promise<boolean> {

	try {
		await project?.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function createProjTask(proj_id: number, task_num: number, name: string, description: string, deadline: Date, situation: number, was_finished: boolean, return_id: boolean): Promise<number | boolean> {

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

		if (return_id == true) {
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

async function getProjTaskById(id: number): Promise<ProjTasks | null> {

	try {
		const proj_task = await ProjTasks.findByPk(id)

		return proj_task
	}
	catch ({ message }) {
		return null
	}
}

async function getAllProjTasks(): Promise<ProjTasks[]> {

	try {
		const proj_tasks = await ProjTasks.findAll()

		return proj_tasks
	}
	catch ({ message }) {
		return []
	}
}

async function getProjTasksByProjId(proj_id: number): Promise<ProjTasks[]> {

	try {
		const proj_tasks = await ProjTasks.findAll({
			where: {
				proj_id: proj_id
			}
		})

		return proj_tasks
	}
	catch ({ message }) {
		return []
	}
}

async function getProjTaskIdByName(name: string): Promise<number | null> {

	try {
		const proj_task = await ProjTasks.findOne({
			where: {
				name: name
			}
		})

		if (proj_task?.id) {
			return proj_task.id
		}
		else {
			return 0
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updateProjTask(proj_task: ProjTasks | undefined | null, proj_id: number, task_num: number, name: string, description: string, deadline: Date, situation: number, was_finished: boolean): Promise<boolean> {

	try {
		if (proj_id && proj_task) { proj_task.proj_id = proj_id }
		if (task_num && proj_task) { proj_task.task_num = task_num }
		if (name && proj_task) { proj_task.name = name }
		if (description && proj_task) { proj_task.description = description }
		if (deadline && proj_task) { proj_task.deadline = deadline }
		if (situation && proj_task) { proj_task.situation = situation }
		if (was_finished != null && was_finished != undefined && proj_task) { proj_task.was_finished = was_finished }

		await proj_task?.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteProjTask(proj_task: ProjTasks | undefined | null): Promise<boolean> {

	try {
		await proj_task?.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createProject, getProjectById, getAllProjects, getProjectsByUserId, getProjectIdByName, updateProject, deleteProject,
createProjTask, getProjTaskById, getAllProjTasks, getProjTasksByProjId, getProjTaskIdByName, updateProjTask, deleteProjTask }
