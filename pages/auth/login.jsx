import Link from 'next/link'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
	useColorModeValue,
	Box, Flex, Button,
	Input, InputGroup, InputRightElement,
	FormLabel, FormControl, FormHelperText
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AuthContext } from "./auth_context.jsx"
import DocumentHead from "../components/document_head.jsx"
import MinNavbar from "../components/min_navbar.jsx"


export default function Login() {
	const { register, handleSubmit } = useForm()
	const { SignIn } = useContext(AuthContext)

	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light' ? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light' ? 'marine' : 'primary')
	const [ loadingButton, setLoadButton ] = useState(false)
	const [showPass, setShowPass] = useState(false)
	const handleShowPass = () => { setShowPass(!showPass) }

	async function handleSignIn(data) {
		setLoadButton(true)

		const logged = await SignIn(data)

		if (!logged) {
			setLoadButton(false)
		}
	}

	return (
		<>
			<head>
				<DocumentHead title="Entre para acessar seu espaço de trabalho"/>
			</head>
			<body>
				<MinNavbar pageName="Acessar o MyWorkspace"/>

				<Flex
					width='100%'
					height='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='center'
				>
					<Box
						height='65vh'
						width={['90vw', '50vw']}
						marginTop={['20px', '60px']}
						boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
						borderRadius='20px'
						backgroundColor={boxBgColor}
						fontSize={['x-large', 'xx-large']}
						textAlign='center'
						justifyContent='center'
					>
						<Box margin='10px'>
							<h2>Entrar</h2>
						</Box>
						<Box id="login-form"
							marginTop={['5px', '20px']}
							marginBottom={['5px', '20px']}
							marginLeft={['2px', '50px']}
							marginRight={['2px', '50px']}
						>
							<form onSubmit={handleSubmit(handleSignIn)}>
								<FormControl isRequired>
									<Box id="login-email" margin='10px 10% 0px 15%'>
										<FormLabel htmlFor='email' marginLeft='15px'>e-Mail:</FormLabel>
										<InputGroup>
											<Input
												type='email' {...register('email')}
												placeholder='Ex: nome.sobrenome@gmail.com'
												maxHeight={['70px', '90px']} maxWidth={['90%', '40vw']} background='green.100'
											/>
										</InputGroup>
										<FormHelperText fontWeight='bold'>
											<Link href="/auth/register" passHref>
												<>
													<Box display={['none', 'contents']}>
														Não possui uma conta? Cadastre-se aqui!
													</Box>
													<Box display={['contents', 'none']}>
														Cadastrar-se →
													</Box>
												</>
											</Link>
										</FormHelperText>
									</Box>
									<Box id="login-pass" margin='10px 10% 0px 15%'>
										<FormLabel htmlFor='password' marginLeft='15px'>Senha:</FormLabel>
										<InputGroup>
											<Input
												type={showPass ? 'text' : 'password'} {...register('password')}
												placeholder='Jamais compartilhe sua senha!'
												maxHeight={['70px', '90px']} maxWidth={['90%', '40vw']} background='green.100'
											/>
											<InputRightElement width="72px" display={['none', 'flex']}>
												<Button onClick={handleShowPass} h="28px" size="sm" background='green.100'>
													{showPass ? <FaEyeSlash size='20'/> : <FaEye size='20'/>}
												</Button>
											</InputRightElement>
										</InputGroup>
										<FormHelperText fontWeight='bold'>
											<Link href="/auth/recovery" passHref>
												<>
													<Box display={['none', 'contents']}>
														Esqueceu sua senha? Recupere seu acesso aqui!
													</Box>
													<Box display={['contents', 'none']}>
														Recuperar senha →
													</Box>
												</>
											</Link>
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
		</>
	)
}
