import React from 'react'
import {
	useColorMode, useColorModeValue,
	Center, Button, IconButton,
	Box, Flex, Input, Select,
	FormLabel, FormControl, FormHelperText
} from '@chakra-ui/react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'
import { FaUserCircle } from 'react-icons/fa'
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

export default function Register() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')

	return (
		<body>
			<DocumentHead title="Configurações da conta"/>
			<Navbar pageName="Ajustes"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='center'
				>
				<Box
					h='420px'
					w='70vw'
					marginTop='60px'
					marginLeft='50px'
					marginRight='50px'
					boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
					borderRadius='20px'
					backgroundColor={boxBgColor}
					fontSize='xx-large'
					textAlign='center'
				>
					<Box id="register-form" margin="20px 50px 20px 50px">
						<FormControl display='flex'>
							<Box marginLeft='20px' marginRight='10px'>
								<Box id="register-username" margin='10px 40px'>
									<FormLabel htmlFor='username' marginLeft='10px'>Nome de Usuário:</FormLabel>
									<Input type="text" placeholder='Ex: meuApelido123@'  width='350px' background='green.100'/>
								</Box>
								<Box id="register-pass" margin='20px 40px'>
									<FormLabel htmlFor='password' marginLeft='10px'>Senha:</FormLabel>
									<Input type="text" placeholder='Jamais compartilhe sua senha!' width='350px' background='green.100'/>
								</Box>
								<Box id="register-theme" margin='10px 40px'>
									<FormLabel htmlFor='theme' marginLeft='10px'>Tema de preferência:</FormLabel>
									<Select placeholder='Selecione um tema' width='250px' background='green.100'>
										<option value="1">Claro</option>
										<option value="2">Escuro</option>
									</Select>
								</Box>
							</Box>
							<Box>
								<Box id="register-image" justifyContent='center' margin='10px 40px'>
									<Box margin='40px 10px 10px 80px'>
										<a href="">
											<FaUserCircle size='90px'/>
										</a>
									</Box>
									<Box fontWeight='bold' fontSize='12pt' marginBottom='50px'>
										Escolher imagem de perfil
									</Box>
								</Box>
								<Box id="register-uf" margin='10px 40px'>
									<FormLabel htmlFor='uf-estado' marginLeft='10px'>Estado:</FormLabel>
									<Select placeholder='Selecione um Estado' width='250px' background='green.100'>
										<option value="1">BA</option>
										<option value="2">ES</option>
										<option value="3">MG</option>
									</Select>
								</Box>
							</Box>
						</FormControl>
						<Box id="submit buttons">
							<Box justifyContent='space-between' marginTop='20px'>
								<Button
									size='lg'
									boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
									variant='ghost'
									backgroundColor='green'
									marginRight='30%'
								>
									Salvar
								</Button>
								<a href="/auth/login">
									<Button
										size='lg'
										boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
										variant='ghost'
										backgroundColor='red'
										marginLeft='30%'
									>
										Cancelar
									</Button>
								</a>
							</Box>
						</Box>
					</Box>
				</Box>
			</Flex>
		</body>
	)
}
