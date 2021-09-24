import { useEffect } from 'react'
import Router from 'next/router'
import { Box } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import Login from "./auth/login.jsx"


export default function AppIndex() {

	useEffect(() => {
		const { 'myworkspace-user_id': user_id } = parseCookies()

		if (user_id) {
			Router.push(`/users/${parseInt(user_id)}`)
		}
		else {
			Router.push('/')
		}
	}, [])

	return (
		<Box
			className="mainpage"
		>
			<Login/>
		</Box>
	)
}
