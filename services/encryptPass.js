import { SHA256, AES } from 'crypto-js'
import jwt from 'jsonwebtoken'
import static_dotenv from "../config/globals/static_dotenv.js"


function hashValue(value) {

	const hashCode = SHA256(value)
	const hash = hashCode.toString()

	return hash
}

function encryptPass(user_id) {

	const cypher = AES.encrypt(`${user_id}`, static_dotenv.secure.secret_key)
	AES.decrypt(cypher, static_dotenv.secure.secret_key)
	const encriptedPass = cypher.toString()

	return encriptedPass
}

function decryptPass(cypher) {

	const decypher = AES.decrypt(cypher, static_dotenv.secure.secret_key)
	const decryptedPass = decypher.toString()

	return decryptedPass
}

function generateToken(user_id, user_email) {
	const token = jwt.sign(
		{
			user_id: user_id,
			user_email: user_email
		},
		static_dotenv.secure.secret_key,
		{
			expiresIn: '3h'
		}
	)

	return token
}

function decodeToken(token) {
	const decoded = jwt.decode(token, static_dotenv.secure.secret_key)

	return decoded
}

export { hashValue, encryptPass, decryptPass, generateToken, decodeToken }
