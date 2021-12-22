import Home from "../../home/index.jsx"


export default function UserHomePage({ user_id }) {
	return (
		<>
		<Home user_id={user_id}/>
		</>
	)
}

export async function getServerSideProps(context) {

	const usr_id = context.query['user_id']

	return {
		props: {
			user_id: usr_id
		}
	}
}
