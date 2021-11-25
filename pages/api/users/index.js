import { getUserById, getPreferenceIdByUserId, getPreferenceById, createPreference, updatePreferences, deletePreference } from "../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const userReq = await getUserById(null)
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
