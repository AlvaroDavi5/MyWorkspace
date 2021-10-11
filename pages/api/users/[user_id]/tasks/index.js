import { getAllTasksByUserId, createTask } from "../../../../../services/taskController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const tasksReq = await getAllTasksByUserId(parseInt(query['user_id']))

				return response.status(201).json(
					{
						success: true,
						query: query,
						method: method,
						data: tasksReq
					}
				)

			case "POST":
				const taskReq = await createTask(
					body['user_id'],
					body['name'],
					body['deadline_date'], body['deadline_time'],
					body['description'],
					false
				)

				return response.status(201).json(
					{
						success: taskReq,
						query: query,
						method: method,
						message: "Task created successfull!"
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
