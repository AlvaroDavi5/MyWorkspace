import { getUserByCredentials } from "../../../../../services/userController.js"
import { getTasksByUserId, createTask } from "../../../../../services/taskController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const tasksReq = await getTasksByUserId(parseInt(query.user_id))

				// ? OK
				return response.status(200).json(
					{
						success: !!tasksReq,
						query: query,
						method: method,
						data: tasksReq
					}
				)

			case "POST":
				const userReq = await getUserByCredentials(body.email, body.password)
				const taskReq = await createTask(
					userReq.id, body.name,
					body.deadline_date, body.deadline_time,
					body.description, false
				)
					
				// ? Created
				return response.status(201).json(
					{
						success: taskReq,
						query: query,
						method: method,
						message: taskReq ? "Task created successfully!" : "Error to create task!"
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
		// ? Not Found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
