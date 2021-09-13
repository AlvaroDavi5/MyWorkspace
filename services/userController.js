const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+"/../.env.development.local"})
const crypto = require('crypto')
const cipher = crypto.createCipher(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_KEY)


const connection = require("../database/connection.js")
const Users = require("../database/models/users.js")

async function createUser(name, email, password, phone, cpf, uf, returnId) {
	Users.init(connection)
	cipher.update(password)
	const pass = cipher.final(process.env.CRYPTO_METHOD)

	try {
		const user = await Users.create(
			{
				name: name,
				email: email,
				password: pass,
				phone: phone,
				cpf: cpf,
				uf: uf
			}
		)

		if (returnId == true) {
			return getUserIdByName(name)
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

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

async function getUserIdByName(userName) {
	Users.init(connection)

	try {
		const user = await Users.findOne({
			where: {
				name: userName
			}
		})

		return user.id
	}
	catch ({ message }) {
		return null
	}
}


export { createUser, getUserById, getUserIdByName }
