import { decodeToken } from "../../../../services/encryptPass.js"
import { getUserById, getPreferenceById, getPreferenceIdByUserId, updateUser, deleteUser, updatePreferences, deletePreference } from "../../../../services/userController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulate = await getUserById(userData.user_id)
		const prefId = await getPreferenceIdByUserId(userToManipulate.id)
		const preferenceToManipulate = await getPreferenceById(prefId)

		switch (request.method) {
			/* get data from api */
			case "GET":
				// ? OK
				return response.status(200).json(
					{
						success: !!userToManipulate,
						query: query,
						method: method,
						data: { user: userToManipulate, preference: preferenceToManipulate }
					}
				)

			/* post new data on api */
			case "POST":
				// ? Forbidden
				return response.status(403).json(
					{
						success: false,
						query: query,
						method: method,
						message: "Post not allowed!"
					}
				)

			/* update data from api */
			case "PUT":
				const hasUserUpdated = await updateUser(userToManipulate,
					body.new_name, body.new_email,
					body.new_password, body.new_phone,
					body.new_cpf, body.new_uf
				)
				const hasPrefUpdated = await updatePreferences(preferenceToManipulate,
					body.new_image_path, body.new_default_theme
				)

				// ? OK
				return response.status(200).json(
					{
						success: hasUserUpdated && hasPrefUpdated,
						query: query,
						method: method,
						message: hasUserUpdated ? "User updated successfully!" : "Error to update user!"
					}
				)

			/* delete data from api */
			case "DELETE":
				const hasUserDeleted = await deleteUser(userToManipulate)
				const hasPrefDeleted = await deletePreference(preferenceToManipulate)

				// ? OK
				return response.status(200).json(
					{
						success: hasUserDeleted && hasPrefDeleted,
						query: query,
						method: method,
						message: hasUserDeleted ? "User deleted successfully!" : "Error to delete user!"
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
