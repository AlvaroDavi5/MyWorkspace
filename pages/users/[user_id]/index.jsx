import { parseCookies } from 'nookies'
import Home from "../../home/index"


export default function UserHomePage({ userToken }) {
	return (
		<>
			<Home userToken={userToken}/>
		</>
	)
}

export async function getServerSideProps(context) {
	const { "myworkspace-user_token": token } = parseCookies(context)

	return {
		props: {
			userToken: token
		}
	}
}
