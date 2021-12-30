import { generateToken, decodeToken } from "../../../../services/encryptPass.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const token = generateToken(
					body.user_id,
					body.user_email
				)

				// ? OK
				return response.status(200).json(
					{
						success: !!token,
						token: token,
						message: !!token ? "Token generated successfully!" : "Error to generate token!",
					}
				)

			case "PUT":
				const decoded_token = decodeToken(body.token)

				// ? OK
				return response.status(200).json(
					{
						success: !!decoded_token,
						decoded_token: decoded_token,
						message: !!decoded_token ? "Token decoded successfully!" : "Error to decode token!",
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
