import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "../../../../../../services/encryptPass"
import { getUserById } from "../../../../../../controllers/userController"
import { getTasksByUserId, updateTask, deleteTask } from "../../../../../../controllers/taskController"
import { httpConstants } from "@config/globals/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id)?.decoded
		const userToManipulateTask = await getUserById(userData.user_id)

		switch (request.method) {
			case "GET":
				const tasksToGet = await getTasksByUserId(Number(userToManipulateTask?.id))
				const taskToGet = tasksToGet?.find(task => task.id == Number(query.task_id))

				return response.status(httpConstants.status.OK).json(
					{
						success: !!taskToGet,
						query: query,
						method: method,
						data: taskToGet
					}
				)

			case "PUT":
				const tasksToUpdate = await getTasksByUserId(Number(userToManipulateTask?.id))
				const taskToUpdate = tasksToUpdate?.find(task => task.id == Number(query.task_id))
				const hasTaskUpdated = await updateTask(
					taskToUpdate,
					Number(userToManipulateTask?.id), body.new_name,
					body.new_deadline_date, body.new_deadline_time,
					body.new_description
				)

				return response.status(httpConstants.status.OK).json(
					{
						success: hasTaskUpdated,
						query: query,
						method: method,
						message: hasTaskUpdated
							? httpConstants.messages.updated("Task")
							: httpConstants.messages.notUpdated("task")
					}
				)

			case "DELETE":
				const tasksToDelete = await getTasksByUserId(Number(userToManipulateTask?.id))
				const taskToDelete = tasksToDelete?.find(task => task.id == Number(query.task_id))
				let hasTaskDeleted = false
				if (userToManipulateTask?.id == taskToDelete?.user_id) {
					hasTaskDeleted = await deleteTask(taskToDelete)
				}

				return response.status(httpConstants.status.OK).json(
					{
						success: !!hasTaskDeleted,
						query: query,
						method: method,
						message: !!hasTaskDeleted
							? httpConstants.messages.deleted("Task")
							: httpConstants.messages.notDeleted("task")
					}
				)

			default:
				return response.status(httpConstants.status.UNAUTHORIZED).json(
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
		return response.status(httpConstants.status.NOT_FOUND).json(
			{
				success: false,
				message: message
			}
		)
	}
}
