import Joi from 'joi'
import type { NextApiResponse } from 'next'
import { httpConstants } from "@config/constants/httpConstants"


export default function validator(data: any, schema: Joi.Schema, response: NextApiResponse) {
	const { error } = schema.validate(data)

	if (!error) {
		return
	}

	return response.status(httpConstants.status.BAD_REQUEST).json({
		error: httpConstants.messages.badRequest("Request"),
		message: error?.message
	})
}
