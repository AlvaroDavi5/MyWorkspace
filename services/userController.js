import { hashValue, decodeToken } from "./encryptPass.js"
const connection = require("../database/connection.js")
const Users = require("../database/models/users.js")
const UserPreferences = require("../database/models/user_preferences.js")


/*
 * CRUD database operations
  ? Create
  ? Read
  ? Update
  ? Delete
*/
async function createUser(name, email, password, phone, cpf, uf, return_id) {
	Users.init(connection)
	const pass = hashValue(password)

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

		if (return_id == true) {
			return user.id
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
		const user = await Users.scope('withoutSensibleData').findByPk(id)

		return user
	}
	catch ({ message }) {
		return null
	}
}

async function getAllUsers() {
	Users.init(connection)

	try {
		const users = await Users.scope('withoutSensibleData').findAll()

		return users
	}
	catch ({ message }) {
		return null
	}
}

async function searchUser(email) {
	Users.init(connection)

	try {
		const user = await Users.findOne({
			where: {
				email: email
			}
		})

		return !!user
	}
	catch ({ message }) {
		return false
	}
}

async function getUserIdByToken(token) {
	const userToken = decodeToken(token).decoded

	return parseInt(userToken.user_id)
}

async function getUserByCredentials(email, password) {
	Users.init(connection)

	try {
		const user = await Users.findOne({
			where: {
				email: email,
				password: hashValue(password)
			}
		})

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			cpf: user.cpf,
			uf: user.uf
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updateUser(user, name, email, password, phone, cpf, uf) {
	Users.init(connection)

	try {
		if (name) { user.name = name }
		if (email) { user.email = email }
		if (password) { user.password = hashValue(password) }
		if (phone) { user.phone = phone }
		if (cpf) { user.cpf = cpf }
		if (uf) { user.uf = uf }

		await user.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteUser(user) {
	Users.init(connection)

	try {
		await user.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function createPreference(user_id, image_path, default_theme, return_id) {
	UserPreferences.init(connection)

	try {
		const preference = await UserPreferences.create(
			{
				user_id: user_id,
				image_path: image_path,
				default_theme: default_theme
			}
		)

		if (return_id == true) {
			return preference.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getPreferenceById(id) {
	UserPreferences.init(connection)

	try {
		const preference = await UserPreferences.findByPk(id)

		return preference
	}
	catch ({ message }) {
		return null
	}
}

async function getAllPreferences() {
	UserPreferences.init(connection)

	try {
		const preferences = await UserPreferences.findAll()

		return preferences
	}
	catch ({ message }) {
		return null
	}
}

async function getPreferenceIdByUserId(user_id) {
	UserPreferences.init(connection)

	try {
		const preference = await UserPreferences.findOne({
			where: {
				user_id: user_id
			}
		})

		return preference.id
	}
	catch ({ message }) {
		return null
	}
}

async function updatePreference(preference, image_path, default_theme) {
	UserPreferences.init(connection)

	try {
		if (image_path) { preference.image_path = image_path }
		if (default_theme) { preference.default_theme = default_theme }

		await preference.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deletePreference(preference) {
	UserPreferences.init(connection)

	try {
		await preference.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createUser, getUserById, getAllUsers, searchUser, getUserIdByToken, getUserByCredentials, updateUser, deleteUser,
createPreference, getPreferenceById, getAllPreferences, getPreferenceIdByUserId, updatePreference, deletePreference }
