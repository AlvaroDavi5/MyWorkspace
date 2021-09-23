import { getUserByCredentials, getPreferenceIdByUserId, getPreferenceById, createUser, createPreference } from "../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
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

			case "POST":
				const userCreateReq = await createUser(
					body['name'], body['email'],
					body['password'], body['phone'],
					body['cpf'], body['uf'],
					true
				)
				const prefCreateReq = await createPreference(
					userCreateReq,
					body['image_path'],
					body['default_theme'],
					false
				)

				return response.status(201).json(
					{
						success: prefCreateReq,
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
