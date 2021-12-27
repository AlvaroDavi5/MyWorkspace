import { SHA256, AES } from 'crypto-js'
import static_dotenv from "../config/globals/static_dotenv.js"


function encrypt(passwd) {

	const hashCode = SHA256(passwd)
	const hash = hashCode.toString()

	return hash
}

function generateToken(user_id) {

	const cypher = AES.encrypt(`${user_id}`, static_dotenv.secure.secret_key)
	const token = cypher.toString()

	return token
}


export { encrypt, generateToken }
