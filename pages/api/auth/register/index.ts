import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, createPreference, searchUser } from "../../../../controllers/userController"
import { httpConstants } from "@config/globals/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "POST":
				const userAlreadyExists = await searchUser(body.email)

				if (userAlreadyExists) {
					return response.status(httpConstants.status.ACCEPTED).json(
						{
							success: !userAlreadyExists,
							query: query,
							method: method,
							message: "User already exists!"
						}
					)
				}

				const userReq = await createUser(
					body.name, body.email,
					body.password, body.phone,
					body.cpf, body.uf,
					true
				)
				const prefReq = await createPreference(
					Number(userReq),
					body.image_path, body.default_theme,
					false
				)
				const created = !!userReq && !!prefReq

				return response.status(httpConstants.status.CREATED).json(
					{
						success: created,
						query: query,
						method: method,
						message: created
							? httpConstants.messages.created("User")
							: httpConstants.messages.notCreated("user")
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
