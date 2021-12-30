import { getUserByCredentials } from "../../../../../../services/userController.js"
import { getTaskById, updateTask, deleteTask } from "../../../../../../services/taskController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const taskReq = await getTaskById(parseInt(query.task_id))

				// ? OK
				return response.status(200).json(
					{
						success: !!taskReq,
						query: query,
						method: method,
						data: taskReq
					}
				)

			case "PUT":
				const userToUpdateTask = await getUserByCredentials(body.email, body.password)
				const taskToUpdate = await getTaskById(parseInt(query.task_id))
				const taskUpdated = await updateTask(
					taskToUpdate,
					userToUpdateTask.id, body.new_name,
					body.new_deadline_date, body.new_deadline_time,
					body.new_description
				)

				// ? OK
				return response.status(200).json(
					{
						success: taskUpdated,
						query: query,
						method: method,
						message: taskUpdated ? "Task updated successfully!" : "Error to update task!"
					}
				)

			case "DELETE":
				const userToDeleteTask = await getUserByCredentials(body.email, body.password)
				const taskToDelete = await getTaskById(parseInt(query.task_id))
				let hasTaskDeleted = false
				if ( userToDeleteTask.id === taskToDelete.user_id ) {
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
