import { SHA256, AES } from 'crypto-js'


function encrypt(passwd) {

	const hashCode = SHA256(passwd)
	const hash = hashCode.toString()

	return hash
}

function generateToken(user_id) {

	// TODO: use environment variables from dotenv files
	const cypher = AES.encrypt(user_id, "pass phrase")
	const token = cypher.toString()

	return token
}


export { encrypt, generateToken }
