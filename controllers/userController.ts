import { hashValue, decodeToken } from "../services/encryptPass"
import Users from "../database/models/users"
import UserPreferences from "../database/models/user_preferences"


/*
 * CRUD database operations
  ? Create
  ? Read
  ? Update
  ? Delete
*/
async function createUser(name: string, email: string, password: string, phone: string, cpf: string, uf: string, return_id: boolean): Promise<number | boolean> {
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

async function getUserById(id: number): Promise<Users | null> {

	try {
		const user = await Users.scope('withoutSensibleData').findByPk(id)

		return user
	}
	catch ({ message }) {
		return null
	}
}

async function getAllUsers(): Promise<Users[] | Users | null> {

	try {
		const users = await Users.scope('withoutSensibleData').findAll()

		return users
	}
	catch ({ message }) {
		return null
	}
}

async function searchUser(email: string): Promise<boolean> {

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

async function getUserIdByToken(token: string): Promise<number> {

	const userToken = decodeToken(token)?.decoded

	return parseInt(userToken.user_id)
}

async function getUserByCredentials(email: string, password: string): Promise<Users | null> {

	try {
		const user = await Users.scope('withoutPassword').findOne({
			where: {
				email: email,
				password: hashValue(password)
			}
		})

		return user
	}
	catch ({ message }) {
		return null
	}
}

async function updateUser(user: Users, name: string, email: string, password: string, phone: string, cpf: string, uf: string): Promise<boolean> {

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

async function deleteUser(user: Users): Promise<boolean> {

	try {
		await user.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function createPreference(user_id: number, image_path: string, default_theme: number, return_id: boolean): Promise<number | boolean> {

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

async function getPreferenceById(id: number): Promise<UserPreferences | null> {

	try {
		const preference = await UserPreferences.findByPk(id)

		return preference
	}
	catch ({ message }) {
		return null
	}
}

async function getAllPreferences(): Promise<UserPreferences[] | UserPreferences | null> {

	try {
		const preferences = await UserPreferences.findAll()

		return preferences
	}
	catch ({ message }) {
		return null
	}
}

async function getPreferenceIdByUserId(user_id: number): Promise<number | null> {

	try {
		const preference = await UserPreferences.findOne({
			where: {
				user_id: user_id
			}
		})

		if (!!preference?.id) {
			return preference.id
		}
		else {
			return 0
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updatePreference(preference: UserPreferences, image_path: string, default_theme: number): Promise<boolean> {

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

async function deletePreference(preference: UserPreferences): Promise<boolean> {

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
