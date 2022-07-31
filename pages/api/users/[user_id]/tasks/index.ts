import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById } from "@controllers/userController"
import { getTasksByUserId, createTask } from "@controllers/taskController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query?.user_id)?.decoded
		const userToManipulateTask = await getUserById(userData.user_id)

		switch (request?.method) {
			case "GET":
				const tasksToGet = await getTasksByUserId(Number(userToManipulateTask?.id))

				return response.status(httpConstants.status.OK).json(
					{
						success: !!tasksToGet,
						query: query,
						method: method,
						data: tasksToGet
					}
				)

			case "POST":
				const taskToCreate = await createTask(
					Number(userToManipulateTask?.id), body?.name,
					body?.deadline_date, body?.deadline_time,
					body?.description, false
				)

				return response.status(httpConstants.status.CREATED).json(
					{
						success: !!taskToCreate,
						query: query,
						method: method,
						message: !!taskToCreate
							? httpConstants.messages.created("Task")
							: httpConstants.messages.notCreated("task")
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
