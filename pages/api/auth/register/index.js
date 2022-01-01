import { createUser, createPreference, searchUser } from "../../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const userAlreadyExists = await searchUser(body.email)

				if (userAlreadyExists) {
					// ? Accepted
					return response.status(202).json(
						{
							success: !userAlreadyExists,
							query: query,
							method: method,
							message: "User already exists!"
						}
					)
				}

				const userReq = await createUser(
					body.name, body.email,
					body.password, body.phone,
					body.cpf, body.uf,
					true
				)
				const prefReq = await createPreference(
					userReq,
					body.image_path, body.default_theme,
					false
				)
				const created = !!userReq && !!prefReq

				// ? Created
				return response.status(201).json(
					{
						success: created,
						query: query,
						method: method,
						message: created ? "User created successfully!" : "Error to create user!"
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
