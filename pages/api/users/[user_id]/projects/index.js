import { getAllProjects, getAllProjTasks, createProject, createProjTask } from "../../../../../services/projectController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const projsReq = await getAllProjects()
				const projTasksReq = await getAllProjTasks()

				// ? OK
				return response.status(200).json(
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

				// ? Created
				return response.status(201).json(
					{
						success: projTaskReq,
						query: query,
						method: method,
						message: "Project created successfull!"
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
