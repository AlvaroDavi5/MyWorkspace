import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import { generateToken, decodeToken } from "@services/encryptPass"
import { httpConstants } from "@config/constants/httpConstants"
import requestValidator from "@middlewares/validators/requestValidator"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		switch (request?.method) {
			case "POST":
				const generateTokenBodySchema = Joi.object({
					user_id: Joi.number().required(),
					user_email: Joi.string().email().required()
				})
				requestValidator(
					body,
					generateTokenBodySchema,
					response
				)

				const token = generateToken(
					body?.user_id,
					body?.user_email
				)

				return response.status(httpConstants.status.OK).json(
					{
						success: !!token,
						token: token,
						message: !!token
							? httpConstants.messages.created("Token")
							: httpConstants.messages.notCreated("token")
					}
				)

			case "PUT":
				const decodeTokenBodySchema = Joi.object({
					token: Joi.string().required()
				})
				requestValidator(
					body,
					decodeTokenBodySchema,
					response
				)

				const decoded_token = decodeToken(body?.token)

				return response.status(httpConstants.status.OK).json(
					{
						success: !!decoded_token?.decoded,
						decoded_token: decoded_token?.decoded,
						message: decoded_token?.message
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
