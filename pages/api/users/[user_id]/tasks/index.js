import { decodeToken } from "../../../../../services/encryptPass.js"
import { getUserById } from "../../../../../services/userController.js"
import { getTasksByUserId, createTask } from "../../../../../services/taskController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const userId = decodeToken(query.user_id)
				const tasksReq = await getTasksByUserId(parseInt(userId.user_id))

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
				const userIdReq = decodeToken(query.user_id)
				const userReq = await getUserById(userIdReq.user_id)
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
