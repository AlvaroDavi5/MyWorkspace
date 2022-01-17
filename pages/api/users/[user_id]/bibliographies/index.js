import { decodeToken } from "../../../../../services/encryptPass.js"
import { getUserById } from "../../../../../services/userController.js"
import { getBibliographiesByUserId, createBibliography } from "../../../../../services/bibliographyController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateBibliography = await getUserById(userData.user_id)

		switch (request.method) {
			case "GET":
				const bibliographiesToGet = await getBibliographiesByUserId(userToManipulateBibliography.id)

				// ? OK
				return response.status(200).json(
					{
						success: !!bibliographiesToGet,
						query: query,
						method: method,
						data: bibliographiesToGet
					}
				)

			case "POST":
				const bibliographyToCreate = await createBibliography(
					userToManipulateBibliography.id,
					body.author, body.name,
					body.publication_date,
					false
				)

				// ? Created
				return response.status(201).json(
					{
						success: bibliographyToCreate,
						query: query,
						method: method,
						message: bibliographyToCreate ? "Bibliography created successfully!" : "Error to create bibliography!"
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
		// ? Not found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
