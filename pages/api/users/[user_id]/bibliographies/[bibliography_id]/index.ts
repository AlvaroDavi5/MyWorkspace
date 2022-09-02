import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById } from "@controllers/userController"
import { getBibliographiesByUserId, updateBibliography, deleteBibliography } from "@controllers/bibliographyController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query?.user_id)?.decoded
		const userToManipulateBibliography = await getUserById(userData.user_id)

		switch (request?.method) {
			case "GET":
				const bibliographiesToGet = await getBibliographiesByUserId(Number(userToManipulateBibliography?.id))
				const bibliographyToGet = bibliographiesToGet?.find(bibliography => bibliography.id == Number(query?.bibliography_id))

				return response.status(httpConstants.status.OK).json(
					{
						success: !!bibliographyToGet,
						query: query,
						method: method,
						data: bibliographyToGet
					}
				)

			case "PUT":
				const bibliographiesToUpdate = await getBibliographiesByUserId(Number(userToManipulateBibliography?.id))
				const bibliographyToUpdate = bibliographiesToUpdate?.find(bibliography => bibliography.id == Number(query?.bibliography_id))
				const hasBibliographyUpdated = await updateBibliography(
					bibliographyToUpdate,
					Number(userToManipulateBibliography?.id), body?.new_author,
					body?.new_name, body?.new_publication_date
				)

				return response.status(httpConstants.status.OK).json(
					{
						success: hasBibliographyUpdated,
						query: query,
						method: method,
						message: hasBibliographyUpdated
							? httpConstants.messages.updated("Bibliography")
							: httpConstants.messages.notUpdated("bibliography")
					}
				)

			case "DELETE":
				const bibliographiesToDelete = await getBibliographiesByUserId(Number(userToManipulateBibliography?.id))
				const bibliographyToDelete = bibliographiesToDelete?.find(bibliography => bibliography.id == Number(query?.bibliography_id))
				let hasBibliographyDeleted = false
				if (userToManipulateBibliography?.id == bibliographyToDelete?.user_id) {
					hasBibliographyDeleted = await deleteBibliography(bibliographyToDelete)
				}

				return response.status(httpConstants.status.OK).json(
					{
						success: !!hasBibliographyDeleted,
						query: query,
						method: method,
						message: !!hasBibliographyDeleted
							? httpConstants.messages.deleted("Bibliography")
							: httpConstants.messages.notDeleted("bibliography")
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
