import { decodeToken } from "../../../../../services/encryptPass.js"
import { getUserById } from "../../../../../../services/userController.js"
import { getBibliographyById, updateBibliography, deleteBibliography } from "../../../../../../services/bibliographyController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const biblioReq = await getBibliographyById(parseInt(query.bibliography_id))

				// ? OK
				return response.status(200).json(
					{
						success: !!biblioReq,
						query: query,
						method: method,
						data: biblioReq
					}
				)

			case "PUT":
				const userId = decodeToken(query.user_id)
				const userToUpdateBibliography = await getUserById(userId.user_id)
				const bibliographyToUpdate = await getBibliographyById(parseInt(query.bibliography_id))
				const bibliographyUpdated = await updateBibliography(
					bibliographyToUpdate,
					userToUpdateBibliography.id, body.new_author,
					body.new_name, body.new_publication_date
				)

				// ? OK
				return response.status(200).json(
					{
						success: bibliographyUpdated,
						query: query,
						method: method,
						message: bibliographyUpdated ? "Bibliography updated successfully!" : "Error to update bibliography!"
					}
				)

			case "DELETE":
				const userIdReq = decodeToken(query.user_id)
				const userToDeleteBibliography = await getUserById(userIdReq.user_id)
				const bibliographyToDelete = await getBibliographyById(parseInt(query.bibliography_id))
				let hasBibliographyDeleted = false
				if ( userToDeleteBibliography.id === bibliographyToDelete.user_id ) {
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
