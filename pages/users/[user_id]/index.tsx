import { parseCookies } from 'nookies'
import Home from "@pages/home/index"


export default function UserHomePage({ userToken }: { userToken: string }) {
	return (
		<>
			<Home userToken={userToken}/>
		</>
	)
}

export async function getServerSideProps(context: any) {
	const { "myworkspace-user_token": token } = parseCookies(context)

	return {
		props: {
			userToken: token
		}
	}
}
