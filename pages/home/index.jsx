import { useEffect, useState } from 'react'
import { Flex, Box, Image, useColorModeValue } from '@chakra-ui/react'
import DocumentHead from "../components/document_head.jsx"
import Navbar from "../components/navbar.jsx"
import style from "./style/home.module.css"


function Card(props) {
	const colorMode = useColorModeValue('light', 'dark')
	const boxBgColor = (colorMode == 'light' ? 'marine' : 'primary')

	return (
		<Box
			h='410px'
			w='300px'
			marginTop='60px'
			marginLeft='50px'
			marginRight='50px'
			boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
			borderRadius='20px'
			backgroundColor={boxBgColor}
			fontSize='xx-large'
			textAlign='center'
			justifyContent='center'
		>
			<a
				href={props.pageHref}
			>
				<Image alt={`${props.children} image`}
					borderRadius='20px'
					width='94%'
					height='70%'
					marginTop='3%'
					marginLeft='3%'
					src={props.imgSource}
				/>
				<Box
					marginTop='15px'
				>
					{props.children}
				</Box>
			</a>
		</Box>
	)
}

export default function Home(props) {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light' ? 'clear_lake' : 'dark_forest')
	const [ userToken, setUserToken ] = useState(null)
	
	useEffect(() => {
		if (props.userToken) {
			setUserToken((props.userToken))
		}
		else {
			setUserToken('')
		}
	}, [])

	return (
		<body className={style.pagebody}>
			<DocumentHead title="Início"/>
			<Navbar pageName="Área de Trabalho"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<Card pageHref={`${userToken}/projects`} imgSource="../assets/projects.png">
					Projetos
				</Card>
				<Card pageHref={`${userToken}/tasks`} imgSource="../assets/tasks.png">
					Tarefas
				</Card>
				<Card pageHref={`${userToken}/bibliographies`} imgSource="../assets/bibliographies.png">
					Consultas Bibliográficas
				</Card>
			</Flex>
		</body>
	)
}
