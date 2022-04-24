import type { NextApiRequest, NextApiResponse } from 'next'
import { httpConstants } from "@config/globals/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query } = request

	try {
		return response.status(httpConstants.status.UNAUTHORIZED).json(
			{
				success: false,
				query: query,
				method: method,
				message: "Unauthorized"
			}
		)
	}
	catch ({ message }) {
		return response.status(httpConstants.status.INTERNAL_SERVER_ERROR).json(
			{
				success: false,
				message: message
			}
		)
	}
}
