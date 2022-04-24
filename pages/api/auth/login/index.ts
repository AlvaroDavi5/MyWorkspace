import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByCredentials, getPreferenceIdByUserId, getPreferenceById } from "@controllers/userController"
import { httpConstants } from "@config/globals/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const userReq = await getUserByCredentials(
					body['email'],
					body['password']
				)
				const prefReq = await getPreferenceById(
					Number(await getPreferenceIdByUserId(
						Number(userReq?.id)
					))
				)

				return response.status(httpConstants.status.OK).json(
					{
						success: !!userReq,
						query: query,
						method: method,
						data: { user: userReq, preference: prefReq }
					}
				)

			default:
				return response.status(httpConstants.status.UNAUTHORIZED).json(
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
		return response.status(httpConstants.status.NOT_FOUND).json(
			{
				success: false,
				message: message
			}
		)
	}
}
