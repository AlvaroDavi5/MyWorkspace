import { decodeToken } from "../../../../../../services/encryptPass"
import { getUserById } from "../../../../../../controllers/userController"
import { getTasksByUserId, updateTask, deleteTask } from "../../../../../../controllers/taskController"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateTask = await getUserById(userData.user_id)

		switch (request.method) {
			case "GET":
				const tasksToGet = await getTasksByUserId(userToManipulateTask.id)
				const taskToGet = tasksToGet.find(task => task.id == query.task_id)

				// ? OK
				return response.status(200).json(
					{
						success: !!taskToGet,
						query: query,
						method: method,
						data: taskToGet
					}
				)

			case "PUT":
				const tasksToUpdate = await getTasksByUserId(userToManipulateTask.id)
				const taskToUpdate = tasksToUpdate.find(task => task.id == query.task_id)
				const hasTaskUpdated = await updateTask(
					taskToUpdate,
					userToManipulateTask.id, body.new_name,
					body.new_deadline_date, body.new_deadline_time,
					body.new_description
				)

				// ? OK
				return response.status(200).json(
					{
						success: hasTaskUpdated,
						query: query,
						method: method,
						message: hasTaskUpdated ? "Task updated successfully!" : "Error to update task!"
					}
				)

			case "DELETE":
				const tasksToDelete = await getTasksByUserId(userToManipulateTask.id)
				const taskToDelete = tasksToDelete.find(task => task.id == query.task_id)
				let hasTaskDeleted = false
				if (userToManipulateTask.id == taskToDelete.user_id) {
					hasTaskDeleted = await deleteTask(taskToDelete)
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!hasTaskDeleted,
						query: query,
						method: method,
						message: !!hasTaskDeleted ? "Task deleted successfully!" : "Error to delete task!"
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
