import { Op } from 'sequelize';


export default async function handler(req, res) {
	try {
		switch (req.method) {
			case 'GET':

				return res.status(200).json(
					{ success: true, data: processes }
				);


			case 'POST':

				return res.status(201).json(
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
		return res.status(200).json(
			{ success: false, data: message }
		);
	}
}
