import { getAllUsers, getAllPreferences, createUser, createPreference } from "../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const usersReq = await getAllUsers()
				const prefsReq = await getAllPreferences()

				return response.status(201).json(
					{
						success: true,
						query: query,
						method: method,
						data: { users: usersReq, preferences: prefsReq }
					}
				)

			case "POST":
				const userReq = await createUser(
					body['name'], body['email'],
					body['password'], body['phone'],
					body['cpf'], body['uf'],
					true
				)
				const prefReq = await createPreference(
					userReq,
					body['image_path'],
					body['default_theme'],
					false
				)

				return response.status(201).json(
					{
						success: prefReq,
						query: query,
						method: method,
						message: "User created successfull!"
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
