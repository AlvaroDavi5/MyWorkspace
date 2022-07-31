import { useEffect } from 'react'
import Router from 'next/router'
import { Box } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import Login from "./auth/login"


export default function AppIndex() {

	useEffect(() => {
		const { "myworkspace-user_token": token } = parseCookies()

		if (token) {
			Router.push(`/users/${token}`)
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
