import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Box, Flex, Button, IconButton, useColorModeValue } from '@chakra-ui/react'
import { IoCreateOutline } from 'react-icons/io5'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { parseCookies } from 'nookies'
import DocumentHead from "../../../components/document_head.jsx"
import Navbar from "../../../components/navbar.jsx"


function ListItem(props) {
	const colorMode = useColorModeValue('light', 'dark')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const descContinue = (((props.desc).toString()).length > 110) ? '...' : ''

	return (
		<Flex
			width='90vw'
			height='75px'
			boxShadow='1px 1px 10px 4px rgba(0, 0, 0, 0.3)'
			margin='20px'
			borderRadius='10px'
			bgColor={boxBgColor}
			flexDirection='row'
			justifyContent='space-between'
		>
			<Box
				backgroundColor='red'
				borderRadius='10px'
				height='20pt'
				width='100px'
				marginTop='25px'
				marginLeft='15px'
				justifyContent='center'
				alignContent='center'
				textAlign='center'
			>
				{props.date}
			</Box>
			<Flex
				justifyContent='center'
				textAlign='center'
				flexDirection='column'
			>
				<Box
					margin='5px'
					fontWeight='bold'
					fontSize='14pt'
				>
					{props.name}
				</Box>
				<Box
					margin='6px'
				>
					{((props.desc.slice(0, 110)).toString()).concat(descContinue)}
				</Box>
			</Flex>
			<Flex
				position='relative'
			>
			<Button
				variant='ghost'
				color='black'
				marginTop='20px'
			>
				<FaEdit/>
			</Button>
			<Button
				variant='ghost'
				color='black'
				marginTop='20px'
				marginRight='10px'
			>
				<FaTrashAlt/>
			</Button>
			</Flex>
		</Flex>
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
						<ListItem date='27/08/2021' name='Task 01' desc='Primeira tarefa.'/>
						<ListItem date='28/09/2022' name='Task 02' desc='Lorem ipsum eu sei lá o que mais aqui...'/>
					</Box>
				</Scrollbars>
			</Box>
		</body>
	)
}
