import { createUser, searchUser } from "../../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const userAlreadyExists = await searchUser(body.email)
				if (userAlreadyExists) {
					return response.status(201).json(
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

				return response.status(200).json(
					{
						success: created,
						query: query,
						method: method,
						message: "User created successfully"
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
