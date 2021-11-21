import { SHA256, AES } from 'crypto-js'
const dotenv = require('dotenv')
dotenv.config({path:__dirname+"/../env/.env.development.local"})


function encrypt(passwd) {

	const hashCode = SHA256(passwd)
	const hash = hashCode.toString()

	return hash
}

function generateToken(user_id) {

	const cypher = AES.encrypt(user_id, process.env.CRYPTO_KEY)
	const token = cypher.toString()

	return token
}


export { encrypt, generateToken }
