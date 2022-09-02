import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById, getPreferenceById, getPreferenceIdByUserId, updateUser, deleteUser, updatePreference, deletePreference } from "@controllers/userController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query?.user_id)?.decoded
		const userToManipulate = await getUserById(userData.user_id)
		const prefId = await getPreferenceIdByUserId(Number(userToManipulate?.id))
		const preferenceToManipulate = await getPreferenceById(Number(prefId))

		switch (request?.method) {
			/* get data from api */
			case "GET":
				return response.status(httpConstants.status.OK).json(
					{
						success: !!userToManipulate,
						query: query,
						method: method,
						data: { user: userToManipulate, preference: preferenceToManipulate }
					}
				)

			/* post new data on api */
			case "POST":
				return response.status(httpConstants.status.FORBIDDEN).json(
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
					body?.new_name, body?.new_email,
					body?.new_password, body?.new_phone,
					body?.new_cpf, body?.new_uf
				)
				const hasPrefUpdated = await updatePreference(preferenceToManipulate,
					body?.new_image_path, body?.new_default_theme
				)

				return response.status(httpConstants.status.OK).json(
					{
						success: hasUserUpdated && hasPrefUpdated,
						query: query,
						method: method,
						message: hasUserUpdated
							? httpConstants.messages.updated("User")
							: httpConstants.messages.notUpdated("user")
					}
				)

			/* delete data from api */
			case "DELETE":
				const hasUserDeleted = await deleteUser(userToManipulate)
				const hasPrefDeleted = await deletePreference(preferenceToManipulate)

				return response.status(httpConstants.status.OK).json(
					{
						success: hasUserDeleted && hasPrefDeleted,
						query: query,
						method: method,
						message: hasUserDeleted
							? httpConstants.messages.deleted("User")
							: httpConstants.messages.notDeleted("user")
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
		/* return error */
		return response.status(httpConstants.status.NOT_FOUND).json(
			{
				success: false,
				message: message
			}
		)
	}
}
