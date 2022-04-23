import { useEffect, useState } from 'react'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import DocumentHead from "../../../components/document_head"
import Navbar from "../../../components/navbar"


export default function BibliographiesPage() {
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
			<DocumentHead title="Bibliografias"/>
			<Navbar pageName="Consultas Bibliográficas"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<div>Bibliografias</div>
			</Flex>
		</body>
	)
}
