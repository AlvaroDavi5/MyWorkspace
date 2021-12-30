import { getUserByCredentials } from "../../../../../services/userController.js"
import { getAllBibliographies, createBibliography } from "../../../../../services/bibliographyController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const bibliographiesReq = await getAllBibliographies()

				// ? OK
				return response.status(200).json(
					{
						success: !!bibliographiesReq,
						query: query,
						method: method,
						data: bibliographiesReq
					}
				)

			case "POST":
				const userReq = await getUserByCredentials(body.email, body.password)
				const biblioReq = await createBibliography(
					userReq.id,
					body.author, body.name,
					body.publication_date,
					false
				)

				// ? Created
				return response.status(201).json(
					{
						success: biblioReq,
						query: query,
						method: method,
						message: biblioReq ? "Bibliography created successfully!" : "Error to create bibliography!"
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
