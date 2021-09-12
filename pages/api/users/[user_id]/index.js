import { AxiosAdapter } from 'axios'
import { Op } from 'sequelize'


export default async function handler(request, response) {
	const { method, query } = request

	try {
		switch (request.method) {
			/* get data from api */
			case "GET":
				return response.status(200).json(
					{
						success: true,
						data: {
							date: (new Date()).toLocaleDateString(),
							pubs: "tecnologia"
						},
						query: query,
						method: method
					}
				)

			/* post new data on api */
			case "POST":
				return response.status(201).json(
					{
						success: true,
						data: { name: "John Smith" },
						query: query,
						method: method
					}
				)

			default:
				return response.status(401).json(
					{
						success: false,
						data: "Unauthorized",
						query: query,
						method: method
					}
				)
		}
	}
	catch ({ message }) {
			/* return error */
			return response.status(200).json(
			{
				success: false,
				message: message
			}
		);
	}
}
