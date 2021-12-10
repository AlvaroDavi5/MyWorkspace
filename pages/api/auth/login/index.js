import { getUserByCredentials, getPreferenceIdByUserId, getPreferenceById } from "../../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const userReq = await getUserByCredentials(
					body['email'],
					body['password']
				)
				const prefReq = await getPreferenceById(await getPreferenceIdByUserId(userReq.id))

				return response.status(201).json(
					{
						success: true,
						query: query,
						method: method,
						data: { user: userReq, preference: prefReq }
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
