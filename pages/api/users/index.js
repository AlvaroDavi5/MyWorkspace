import { getUserByCredentials, getUserById, getPreferenceById, getPreferenceIdByUserId, updateUser, deleteUser, updatePreferences, deletePreference } from "../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "DELETE":
				const delUserId = await getUserByCredentials(body.email, body.password)
				const delPrefId = await getPreferenceIdByUserId(delUserId.id)
				const userToDelete = await getUserById(delUserId.id)
				const prefToDelete = await getPreferenceById(delPrefId)
				const hasUserDeleted = await deleteUser(userToDelete)
				const hasPrefDeleted = await deletePreference(prefToDelete)

				// ? OK
				return response.status(200).json(
					{
						success: hasUserDeleted && hasPrefDeleted,
						query: query,
						method: method,
						message: hasUserDeleted ? "User deleted successfully!" : "Error to delete user!"
					}
				)

			case "PUT":
				const upUserId = await getUserByCredentials(body.email, body.password)
				const upPrefId = await getPreferenceIdByUserId(upUserId.id)
				const userToUpdate = await getUserById(upUserId.id)
				const prefToUpdate = await getPreferenceById(upPrefId)
				const userUpdated = await updateUser(userToUpdate,
					body.new_name, body.new_email,
					body.new_password, body.new_phone,
					body.new_cpf, body.new_uf
				)
				const prefUpdated = await updatePreferences(prefToUpdate,
					body.new_image_path, body.new_default_theme
				)

				// ? OK
				return response.status(200).json(
					{
						success: userUpdated && prefUpdated,
						query: query,
						method: method,
						message: userUpdated ? "User updated successfully!" : "Error to update user!"
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
		/* return error */
		// ? Not Found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
