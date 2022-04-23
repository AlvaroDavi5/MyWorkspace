import { decodeToken } from "../../../../../services/encryptPass"
import { getUserById } from "../../../../../controllers/userController"
import { getProjectIdByName, getProjectsByUserId, getAllProjTasks, createProject, createProjTask } from "../../../../../controllers/projectController"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateProject = await getUserById(userData.user_id)
		const allProjTasks = await getAllProjTasks()

		switch (request.method) {
			case "GET":
				const projectsToGet = await getProjectsByUserId(userToManipulateProject.id)
				const projList = []
				for (let i = 0; i < projectsToGet.length; i++) {
					const projTasksList = allProjTasks.filter(projTask => projTask.proj_id == (projectsToGet[i]).id)
					projList.push({
						project: projectsToGet[i],
						proj_tasks: projTasksList
					})
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!projectsToGet,
						query: query,
						method: method,
						data: projList
					}
				)

			case "POST":
				let projId = await getProjectIdByName(body.proj_name)
				let hasCreatedProject = false
				if (!!userToManipulateProject && !projId) {
					projId = await createProject(
						userToManipulateProject.id,
						body.proj_name
					)
					hasCreatedProject = true
				}
				let hasCreatedProjTask = false
				if (!!userToManipulateProject && !allProjTasks.find(projTask => projTask.task_num == body.task_num)) {
					hasCreatedProjTask = await createProjTask(
						projId,
						body.task_num, body.task_name,
						body.description, body.deadline,
						body.situation, body.was_finished,
						false
					)
				}
				const hasCreated = !!hasCreatedProject || !!hasCreatedProjTask

				// ? Created
				return response.status(201).json(
					{
						success: hasCreated,
						query: query,
						method: method,
						message: hasCreated ? "Project or project task created successfully!" : "Error to create project or project task!"
					}
				)

			default:
				// ? Unauthorized
				return response.status(401).json(
					{
						success: false,
						query: query,
						method: method,
						message: "Unauthorized"
					}
				)
		}
	}
	catch ({ message }) {
		// ? Not found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
