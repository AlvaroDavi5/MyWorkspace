
export default async function apiResponse(request, response) {
	const { method, query } = request

	try {
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
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
