import { getAllBibliographies, createBibliography } from "../../../../../services/bibliographyController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const bibliographiesReq = await getAllBibliographies()

				return response.status(201).json(
					{
						success: true,
						query: query,
						method: method,
						data: bibliographiesReq
					}
				)

			case "POST":
				const biblioReq = await createBibliography(
					body['user_id'],
					body['author'], body['name'],
					body['publication_date'],
					false
				)

				return response.status(201).json(
					{
						success: biblioReq,
						query: query,
						method: method,
						message: "Bibliography saved successfull!"
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
