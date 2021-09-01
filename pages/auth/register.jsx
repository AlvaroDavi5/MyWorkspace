import React from 'react'
import {
	useColorMode, useColorModeValue,
	Center, Button, IconButton,
	Flex, Box
} from '@chakra-ui/react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'
import DocumentHead from "../components/document_head.jsx"


function Navbar(props) {
	const { colorMode,  toggleColorMode } = useColorMode()
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const textColor = (colorMode == 'light'? 'white' : 'black')
	const iconColor = (colorMode == 'light'? 'black' : 'white')

	return (
		<Box
			bg={boxBgColor}
			w='100%'
			h='100px'
			p={5}
			color='black'
			boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
			boxSizing='border-box'
			padding='10px 15px'
			display='flex'
			justifyContent='space-between'
			alignItems='center'
		>
			<div
				className="logo"
			>
				<a href="https://github.com/AlvaroDavi5/MyWorkspace"
				>
					<Button
						size='xl'
						boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
						color={iconColor}
						variant='mw_button'
						bg={textColor}
						padding='5px'
						display='list-item'
					>
						<DiGithubBadge size='60'/>
					</Button>
				</a>
			</div>

			<Center
				color="black"
				display='inline-block'
				justifySelf='center'
				textAlign='center'
				margin='5px'
				fontSize='xx-large'
			>
				{props.pageName}
			</Center>

			<div
				className="menu-button"
				flex='1'
			>
				<IconButton
					icon={colorMode == 'light'? <BiMoon size='30'/> : <BiSun size='30'/>}
					variant='ghost'
					backgroundColor={boxBgColor}
					color='black'
					marginRight='50px'
					boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
					onClick={toggleColorMode}
				/>
			</div>
		</Box>
	)
}

export default function Register() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')

	return (
		<body>
			<DocumentHead title="Registre para usar a plataforma"/>
			<Navbar pageName="Registrar"/>

			<Flex
				w='100%'
				h='100%'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<Box>
					Tela de Cadastro
				</Box>
			</Flex>
		</body>
	)
}
