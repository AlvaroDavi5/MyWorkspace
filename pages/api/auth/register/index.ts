import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import { createUser, createPreference, searchUser } from "@controllers/userController"
import { httpConstants } from "@config/constants/httpConstants"
import requestValidator from "@middlewares/validators/requestValidator"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		switch (request?.method) {
			case "POST":
				const registerBodySchema = Joi.object({
					name: Joi.string().required(),
					email: Joi.string().email().required(),
					password: Joi.string().required(),
					phone: Joi.string().required(),
					cpf: Joi.string().required(),
					uf: Joi.string().length(2).required(),
					image_path: Joi.string().required(),
					default_theme: Joi.number(),
				})
				requestValidator(
					body,
					registerBodySchema,
					response
				)

				const userAlreadyExists = await searchUser(body?.email)

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
					body?.name, body?.email,
					body?.password, body?.phone,
					body?.cpf, body?.uf,
					true
				)
				const prefReq = await createPreference(
					Number(userReq),
					body?.image_path, body?.default_theme,
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
