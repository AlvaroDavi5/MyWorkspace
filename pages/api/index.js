
export default async function apiResponse(request, response) {
	const { method, query } = request

	try {
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
	catch ({ message }) {
		// ? Internal Server Error
		return response.status(500).json(
			{
				success: false,
				message: message
			}
		)
	}
}
