import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Box, IconButton, useColorModeValue } from '@chakra-ui/react'
import { IoCreateOutline } from 'react-icons/io5'
import { FaTrashAlt } from 'react-icons/fa'
import { parseCookies } from 'nookies'
import DocumentHead from "../../../components/document_head.jsx"
import Navbar from "../../../components/navbar.jsx"


function ListItem(params) {
	return (
		<Box
			width='90vw'
			height='40px'
			boxShadow='1px 1px 10px 4px rgba(0, 0, 0, 0.3)'
			margin='20px'
			borderRadius='10px'
			bgColor={params.bgColor}
			textAlign='center'
		>
			{params.text}
		</Box>
	)
}

export default function TasksPage() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
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

			<Box
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<Box
					width='100%'
				>
					<IconButton
						variant='ghost'
						bgColor={boxBgColor}
						color='black'
						margin='10px'
						boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
					>
						<IoCreateOutline size='40px'/>
					</IconButton>
				</Box>
				<Scrollbars>
					<Box
						justifyContent='center'
						marginLeft='40px'
						marginRight='40px'
					>
						<ListItem bgColor={boxBgColor} text="Oiii"/>
						<ListItem bgColor={boxBgColor} text="Ola!!!"/>
					</Box>
				</Scrollbars>
			</Box>
		</body>
	)
}
