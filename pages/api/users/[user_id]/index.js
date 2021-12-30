import { decodeToken } from "../../../../services/encryptPass.js"
import { getUserById, getPreferenceById, getPreferenceIdByUserId } from "../../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query } = request

	try {
		switch (request.method) {
			/* get data from api */
			case "GET":
				const userId = decodeToken(query.user_id)
				const userReq = await getUserById(parseInt(userId.user_id))
				const prefIdReq = await getPreferenceIdByUserId(userReq.id)
				const prefReq = await getPreferenceById(prefIdReq)

				// ? OK
				return response.status(200).json(
					{
						success: !!userReq,
						query: query,
						method: method,
						data: { user: userReq, preference: prefReq }
					}
				)

			/* post new data on api */
			case "POST":
				// ? Forbidden
				return response.status(403).json(
					{
						success: false,
						query: query,
						method: method,
						message: "Post not allowed!"
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
		/* return error */
		// ? Not Found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
