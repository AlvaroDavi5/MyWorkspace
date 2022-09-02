import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById } from "@controllers/userController"
import { getBibliographiesByUserId, createBibliography } from "@controllers/bibliographyController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query?.user_id)?.decoded
		const userToManipulateBibliography = await getUserById(userData.user_id)

		switch (request?.method) {
			case "GET":
				const bibliographiesToGet = await getBibliographiesByUserId(Number(userToManipulateBibliography?.id))

				return response.status(httpConstants.status.OK).json(
					{
						success: !!bibliographiesToGet,
						query: query,
						method: method,
						data: bibliographiesToGet
					}
				)

			case "POST":
				const bibliographyToCreate = await createBibliography(
					Number(userToManipulateBibliography?.id),
					body?.author, body?.name,
					body?.publication_date,
					false
				)

				return response.status(httpConstants.status.CREATED).json(
					{
						success: bibliographyToCreate,
						query: query,
						method: method,
						message: bibliographyToCreate
							? httpConstants.messages.created("Bibliography")
							: httpConstants.messages.notCreated("bibliography")
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
