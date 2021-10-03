import { SHA256 } from 'crypto-js'


export default function encrypt(password) {

	const hashCode = SHA256(password)

	return hashCode.toString()
}
