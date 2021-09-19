const dotenv = require('dotenv')
dotenv.config({path:__dirname+"/../.env.development.local"})
const crypto = require('crypto')
const cipher = crypto.createHash(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_KEY)


export default function encrypt(password) {
	cipher.update(password)

	const pass = cipher.final(process.env.CRYPTO_METHOD)

	return pass
}
