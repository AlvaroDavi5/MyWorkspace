import { AxiosAdapter } from 'axios'
import { Op } from 'sequelize'


export default async function handler(request, response) {
	try {
		switch (request.method) {
			/* get data from api */
			case 'GET':
				return response.status(200).json(
					{
						success: true,
						data: {
							date: (new Date()).toLocaleDateString(),
							pubs: "tecnologia"
						}
					}
				);

			/* post new data on api */
			case 'POST':
				return response.status(201).json(
					{
						success: true,
						data: { name: "John Smith" }
					}
				);

			default:
				break;
		}
	}
	catch ({ message }) {
			/* return error */
			return response.status(200).json(
			{ success: false, data: message }
		);
	}
}
