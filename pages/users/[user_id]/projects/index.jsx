import { useEffect, useState } from 'react'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import DocumentHead from "../../../components/document_head.jsx"
import Navbar from "../../../components/navbar.jsx"


export default function ProjectsPage() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light' ? 'clear_lake' : 'dark_forest')
	const [ userToken, setUserToken ] = useState('')

	useEffect(() => {
		const { "myworkspace-user_token": token } = parseCookies()

		if (token) {
			setUserToken(token)
		}
		else {
			setUserToken('')
		}
	}, [])

	return (
		<body>
			<DocumentHead title="Projetos"/>
			<Navbar pageName="Projetos"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<div>Projetos</div>
			</Flex>
		</body>
	)
}
