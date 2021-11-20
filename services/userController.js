import { encrypt } from "./encryptPass.js"
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
async function createUser(name, email, password, phone, cpf, uf, returnId) {
	Users.init(connection)
	const pass = encrypt(password)

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
		const user = await Users.findByPk(id)

		return user
	}
	catch ({ message }) {
		return null
	}
}

async function getAllUsers() {
	Users.init(connection)

	try {
		const users = await Users.findAll()

		return users
	}
	catch ({ message }) {
		return null
	}
}

async function getUserByCredentials(email, password) {
	Users.init(connection)

	try {
		const user = await Users.findOne({
			where: {
				email: email,
				password: encrypt(password)
			}
		})

		return user
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
		if (password) { user.password = encrypt(password) }
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

async function createPreference(user_id, image_path, default_theme, returnId) {
	UserPreferences.init(connection)

	try {
		const preference = await UserPreferences.create(
			{
				user_id: user_id,
				image_path: image_path,
				default_theme: default_theme
			}
		)

		if (returnId == true) {
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

async function updatePreferences(preference, user_id, image_path, default_theme) {
	UserPreferences.init(connection)

	try {
		if (user_id) { preference.user_id = user_id }
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


export { createUser, getUserById, getAllUsers, getUserByCredentials, updateUser, deleteUser,
createPreference, getPreferenceById, getAllPreferences, getPreferenceIdByUserId, updatePreferences, deletePreference }
