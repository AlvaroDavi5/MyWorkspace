import { getProjectById } from "../../../../../../services/projectController.js"


export default async function apiResponse(request, response) {
	const { method, query } = request

	try {
		switch (request.method) {
			case "GET":
				const projectReq = await getProjectById(parseInt(query['project_id']))

				return response.status(200).json(
					{
						success: true,
						query: query,
						method: method,
						data: projectReq
					}
				)

			case "POST":
				return response.status(201).json(
					{
						success: false,
						query: query,
						method: method,
						message: "Post not allowed!"
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
