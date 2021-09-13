import { getUserById } from "../../../../services/userController.js"


export default async function response(request, response) {
	const { method, query } = request

	try {
		switch (request.method) {
			/* get data from api */
			case "GET":
				const userReq = await getUserById(parseInt(query['user_id']))

				return response.status(200).json(
					{
						success: (userReq != null) ? true : false,
						query: query,
						method: method,
						data: userReq
					}
				)

			/* post new data on api */
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
			/* return error */
			return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
