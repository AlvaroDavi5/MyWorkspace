import { getUserByCredentials } from "../../../../../services/userController.js"
import { getProjectIdByName, getProjectsByUserId, getAllProjTasks, createProject, createProjTask } from "../../../../../services/projectController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const projsReq = await getProjectsByUserId(parseInt(query.user_id))
				const projTasksReq = await getAllProjTasks()
				const projList = []
				for (let i = 0; i < projsReq.length; i++) {
					const projTasksList = projTasksReq.filter(projTask => projTask.proj_id === (projsReq[i]).id)
					projList.push({
						project: projsReq[i],
						proj_tasks: projTasksList
					})
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!projsReq,
						query: query,
						method: method,
						data: projList
					}
				)

			case "POST":
				const userReq = await getUserByCredentials(body.email, body.password)
				let projId = await getProjectIdByName(body.proj_name)
				let hasCreatedProject = false
				if (!!userReq && !projId) {
					projId = await createProject(
						userReq.id,
						body.proj_name
					)
					hasCreatedProject = true
				}
				const allProjTasks = await getAllProjTasks()
				let projTaskReq = null
				let hasCreatedProjTask = false
				if (!!userReq && !allProjTasks.find(projTask => projTask.task_num === body.task_num)) {
					projTaskReq = await createProjTask(
						projId,
						body.task_num, body.task_name,
						body.description, body.deadline,
						body.situation, body.was_finished,
						false
					)
					hasCreatedProjTask = true
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
