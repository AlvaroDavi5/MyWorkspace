import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Flex, Box, Image, useColorModeValue } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import DocumentHead from "../../../components/document_head.jsx"
import Navbar from "../../../components/navbar.jsx"


export default function TasksPage() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')
	const [ usr_id, setUserId ] = useState('')

	useEffect(() => {
		const { 'myworkspace-user_id': user_id } = parseCookies()

		if (user_id) {
			setUserId(parseInt(user_id))
		}
		else {
			setUserId('')
		}
	}, [])

	return (
		<body>
			<DocumentHead title="Tarefas"/>
			<Navbar pageName="Tarefas"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<div>Tarefas</div>
				<Scrollbars>
				</Scrollbars>
			</Flex>
		</body>
	)
}
