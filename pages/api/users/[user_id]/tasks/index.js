import { decodeToken } from "../../../../../services/encryptPass"
import { getUserById } from "../../../../../controllers/userController"
import { getTasksByUserId, createTask } from "../../../../../controllers/taskController"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateTask = await getUserById(userData.user_id)

		switch (request.method) {
			case "GET":
				const tasksToGet = await getTasksByUserId(userToManipulateTask.id)

				// ? OK
				return response.status(200).json(
					{
						success: !!tasksToGet,
						query: query,
						method: method,
						data: tasksToGet
					}
				)

			case "POST":
				const taskToCreate = await createTask(
					userToManipulateTask.id, body.name,
					body.deadline_date, body.deadline_time,
					body.description, false
				)

				// ? Created
				return response.status(201).json(
					{
						success: !!taskToCreate,
						query: query,
						method: method,
						message: !!taskToCreate ? "Task created successfully!" : "Error to create task!"
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
