import { getAllProjects, getAllProjTasks, createProject, createProjTask } from "../../../../../services/projectController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const projsReq = await getAllProjects()
				const projTasksReq = await getAllProjTasks()

				return response.status(201).json(
					{
						success: true,
						query: query,
						method: method,
						data: { projects: projsReq, proj_tasks: projTasksReq }
					}
				)

			case "POST":
				const projReq = await createProject(
					body['user_id'],
					body['name'],
					true
				)
				const projTaskReq = await createProjTask(
					projReq,
					body['task_num'],
					body['name'],
					body['description'],
					body['deadline'],
					body['situation'],
					body['was_finished'],
					false
				)

				return response.status(201).json(
					{
						success: projTaskReq,
						query: query,
						method: method,
						message: "Project created successfull!"
					}
				)

			default:
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
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
