import { decodeToken } from "../../../../../../services/encryptPass"
import { getUserById } from "../../../../../../controllers/userController"
import { getBibliographiesByUserId, updateBibliography, deleteBibliography } from "../../../../../../controllers/bibliographyController"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateBibliography = await getUserById(userData.user_id)

		switch (request.method) {
			case "GET":
				const bibliographiesToGet = await getBibliographiesByUserId(userToManipulateBibliography.id)
				const bibliographyToGet = bibliographiesToGet.find(bibliography => bibliography.id == query.bibliography_id)

				// ? OK
				return response.status(200).json(
					{
						success: !!bibliographyToGet,
						query: query,
						method: method,
						data: bibliographyToGet
					}
				)

			case "PUT":
				const bibliographiesToUpdate = await getBibliographiesByUserId(userToManipulateBibliography.id)
				const bibliographyToUpdate = bibliographiesToUpdate.find(bibliography => bibliography.id == query.bibliography_id)
				const hasBibliographyUpdated = await updateBibliography(
					bibliographyToUpdate,
					userToManipulateBibliography.id, body.new_author,
					body.new_name, body.new_publication_date
				)

				// ? OK
				return response.status(200).json(
					{
						success: hasBibliographyUpdated,
						query: query,
						method: method,
						message: hasBibliographyUpdated ? "Bibliography updated successfully!" : "Error to update bibliography!"
					}
				)

			case "DELETE":
				const bibliographiesToDelete = await getBibliographiesByUserId(userToManipulateBibliography.id)
				const bibliographyToDelete = bibliographiesToDelete.find(bibliography => bibliography.id == query.bibliography_id)
				let hasBibliographyDeleted = false
				if (userToManipulateBibliography.id == bibliographyToDelete.user_id) {
					hasBibliographyDeleted = await deleteBibliography(bibliographyToDelete)
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!hasBibliographyDeleted,
						query: query,
						method: method,
						message: !!hasBibliographyDeleted ? "Bibliography deleted successfully!" : "Error to delete bibliography!"
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
