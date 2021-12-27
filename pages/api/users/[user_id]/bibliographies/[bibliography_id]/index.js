import { getBibliographyById } from "../../../../../../services/bibliographyController.js"


export default async function apiResponse(request, response) {
	const { method, query } = request

	try {
		switch (request.method) {
			case "GET":
				const biblioReq = await getBibliographyById(parseInt(query['bibliography_id']))

				// ? OK
				return response.status(200).json(
					{
						success: true,
						query: query,
						method: method,
						data: biblioReq
					}
				)

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
		// ? Not found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
