import { useEffect, useState } from 'react'
import { Flex, Box, Image, useColorModeValue } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import DocumentHead from "../components/document_head.jsx"
import Navbar from "../components/navbar.jsx"
import style from "./style/home.module.css"


function Card(props) {
	const colorMode = useColorModeValue('light', 'dark')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')

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
				<Image
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
					{props.cardName}
				</Box>
			</a>
		</Box>
	)
}

export default function Home() {
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
		<body className={style.pagebody}>
			<DocumentHead title="Início"/>
			<Navbar pageName="Área de Trabalho"/>

			<Flex
				w='100%'
				h='100%'
				position="fixed"
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<Card
					cardName="Projetos"
					pageHref={`${usr_id}/projects`}
					imgSource="https://tecnopressure.com.br/wp-content/uploads/2019/10/Tecno-Pressure-Estudo-de-Viabilidade-T%C3%A9cnico-Econ%C3%B4mica-Projeto-Engenharia-Seguran%C3%A7a-Qualidade-NR-13.jpg"
				/>
				<Card
					cardName="Tarefas"
					pageHref={`${usr_id}/tasks`}
					imgSource="https://st2.depositphotos.com/1579454/8355/i/600/depositphotos_83553642-stock-photo-checklist-paper-and-pen.jpg"
				/>
				<Card
					cardName="Consultas Bibliográficas"
					pageHref={`${usr_id}/bibliographies`}
					imgSource="https://video-images.vice.com/articles/5d44c9622980b0000824a7e3/lede/1564789576071-GettyImages-949118068.jpeg?crop=1xw:0.8419xh;0xw,0.1581xh"
				/>
			</Flex>
		</body>
	)
}
