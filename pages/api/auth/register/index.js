import { createUser, searchUser } from "../../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const userAlreadyExists = await searchUser(body.email)

				if (userAlreadyExists) {
					// ? Conflict
					return response.status(409).json(
						{
							success: !userAlreadyExists,
							query: query,
							method: method,
							message: "User already exists"
						}
					)
				}

				const userReq = await createUser(
					body['name'],
					body['email'],
					body['password'],
					body['phone'],
					body['cpf'],
					body['uf'],
					false
				)
				const created = await !!userReq

				// ? Created
				return response.status(201).json(
					{
						success: created,
						query: query,
						method: method,
						message: "User created successfully"
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
		// ? Not Found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
