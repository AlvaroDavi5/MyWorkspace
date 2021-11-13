import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
	useColorMode, useColorModeValue,
	Center, Button, IconButton,
	Box, Flex, Input,
	FormLabel, FormControl, FormHelperText
} from '@chakra-ui/react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'
import { AuthContext } from "./auth_context.jsx"
import DocumentHead from "../components/document_head.jsx"


function Navbar(props) {
	const { colorMode,  toggleColorMode } = useColorMode()
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const textColor = (colorMode == 'light'? 'white' : 'black')
	const iconColor = (colorMode == 'light'? 'black' : 'white')

	return (
		<Flex
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
		</Flex>
	)
}

export default function Login() {
	const { register, handleSubmit } = useForm()
	const { SingIn } = useContext(AuthContext)

	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const [ loadingButton, setLoadButton ] = useState(false)

	async function handleSignIn(data) {
		setLoadButton(true)

		const logged = await SingIn(data)

		if (!logged) {
			setLoadButton(false)
		}
	}

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
					height='65vh'
					width='50vw'
					margin='60px'
					boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
					borderRadius='20px'
					backgroundColor={boxBgColor}
					fontSize='xx-large'
					textAlign='center'
					justifyContent='center'
				>
					<Box margin='10px'><h2>Entrar</h2></Box>
					<Box id="login-form" margin="20px 50px 20px 50px">
						<form onSubmit={handleSubmit(handleSignIn)}>
							<FormControl isRequired>
								<Box id="login-email" margin='10px 40px'>
									<FormLabel htmlFor='email' marginLeft='10px'>e-Mail:</FormLabel>
									<Input id="input-email" type='email' {...register('email')} placeholder='Ex: nome.sobrenome@gmail.com' maxWidth='40vw' background='green.100'/>
									<FormHelperText fontWeight='bold'>
										Não possui uma conta? <a href="/auth/register">Cadastre-se aqui</a>!
									</FormHelperText>
								</Box>
								<Box id="login-pass" margin='10px 40px'>
									<FormLabel htmlFor='password' marginLeft='10px'>Senha:</FormLabel>
									<Input id="input-password" type='password' {...register('password')} placeholder='Jamais compartilhe sua senha!' maxWidth='40vw' background='green.100'/>
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
									isLoading={loadingButton}
									type='submit'
								>
									Entrar
								</Button>
							</FormControl>
						</form>
					</Box>
				</Box>
			</Flex>
		</body>
	)
}
