const connection = require("../database/connection.js")
const Users = require("../database/models/users.js")


async function getUserById(id) {
	Users.init(connection)

	try {
		const user = await Users.findByPk(id)

		return user
	}
	catch ({ message }) {
		return null
	}
}


export { getUserById }
