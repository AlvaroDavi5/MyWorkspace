import React from 'react'
import {
	useColorMode, useColorModeValue,
	Center, Button, IconButton,
	Box, Flex, Input,
	FormLabel, FormControl, FormHelperText
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
				color='black'
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

export default function Login() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')

	return (
		<body>
			<DocumentHead title="Entre para acessar seu espaço de trabalho"/>
			<Navbar pageName="Acessar o MyWorkspace"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='center'
				>
				<Box
					h='410px'
					w='50vw'
					marginTop='60px'
					marginLeft='50px'
					marginRight='50px'
					boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
					borderRadius='20px'
					backgroundColor={boxBgColor}
					fontSize='xx-large'
					textAlign='center'
				>
					<h2>Entrar</h2>
					<Box id="login-form" margin="20px 50px 20px 50px">
						<FormControl>
							<Box id="login-email" margin='10px 40px'>
								<FormLabel htmlFor='email' marginLeft='10px'>e-Mail:</FormLabel>
								<Input type='email' placeholder='Ex: nome.sobrenome@gmail.com' background='green.100'/>
								<FormHelperText fontWeight='bold'>
									Não possui uma conta? <a href="/auth/register">Cadastre-se aqui</a>!
								</FormHelperText>
							</Box>
							<Box id="login-pass" margin='10px 40px'>
								<FormLabel htmlFor='password' marginLeft='10px'>Senha:</FormLabel>
								<Input type='text' placeholder='Jamais compartilhe sua senha!' background='green.100'/>
								<FormHelperText fontWeight='bold'>
									Esqueceu sua senha? <a href="/auth/recovery">Recupere seu acesso aqui</a>!
								</FormHelperText>
							</Box>
							<Button
								id="login-submit-button"
								margin='30px'
								size='lg'
								boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
								variant='mw_button'
								onClick={() => {alert("Erro ao entrar")}}
							>
								Entrar
							</Button>
						</FormControl>
					</Box>
				</Box>
			</Flex>
		</body>
	)
}
