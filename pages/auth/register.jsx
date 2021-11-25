import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	useColorModeValue, useToast,
	Box, Flex, Button, Select,
	Input, InputGroup, InputRightElement,
	FormLabel, FormControl, FormHelperText
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa'
import axios from 'axios'
import { toastStatuses } from "../auth/auth_context.jsx"
import DocumentHead from "../components/document_head.jsx"
import { getAllBrazilStates } from "../../services/apiRequester"
import MinNavbar from "../components/min_navbar.jsx"


export default function Register({ stateList }) {
	const { register, handleSubmit } = useForm()

	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light' ? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light' ? 'marine' : 'primary')
	const toast = useToast()
	const [ loadingButton, setLoadButton ] = useState(false)
	const [showPass, setShowPass] = useState(false)
	const handleShowPass = () => { setShowPass(!showPass) }

	async function handleSignUp(data) {
		setLoadButton(true)

		try {
			const reqData = await axios.post(
				"http://localhost:8080/api/auth/register/",
				{
					name: data.username,
					email: data.email,
					password: data.password,
					phone: null,
					cpf: null,
					uf: data.uf
				}
			)
			const registered = reqData.data.message

			if (registered == "User already exists") {
				setLoadButton(false)
				toast({
					status: toastStatuses[2][0],
					title: toastStatuses[2][1],
					description: `Usuário ${data.username} já cadastrado!`,
					duration: 1500,
					isClosable: true
				})
			}
			else {
				setLoadButton(false)
				toast({
					status: toastStatuses[0][0],
					title: `Usuário ${data.username} cadastrado com sucesso.`,
					description: "Volte à tela de login e insira suas credenciais para acessar.",
					duration: 1500,
					isClosable: true
				})
			}
		}
		catch (error) {
			toast({
				status: toastStatuses[1][0],
				description: "Erro ao cadastrar usuário!",
				description: `${error}`,
				duration: 1500,
				isClosable: true
			})
		}
	}

	function stateOptionsRender() {
		return stateList.map(state => {
			return (
				<option key={state.id} value={state.sigla}>
					{state.nome}
				</option>
			)
		})
	}

	return (
		<body>
			<DocumentHead title="Registre para usar a plataforma"/>
			<MinNavbar pageName="Registrar no MyWorkspace"/>

			<Flex
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='center'
			>
				<Flex
					h='70vh'
					w='65vw'
					margin='50px'
					boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
					borderRadius='20px'
					backgroundColor={boxBgColor}
					fontSize='xx-large'
					textAlign='center'
				>
					<Box id="register-form" margin="20px 50px 20px 50px">
						<form onSubmit={handleSubmit(handleSignUp)}>
							<FormControl isRequired={true} display='flex'>
								<Box>
									<Box id="register-username" margin='10px 40px'>
										<FormLabel htmlFor='username' marginLeft='10px'>Nome de Usuário:</FormLabel>
										<Input
											type='text' {...register('username')}
											placeholder='Ex: meuApelido123@'
											maxWidth='27vw' background='green.100'
										/>
										<FormHelperText fontWeight='bold' maxWidth='27vw'>
											Use letras maiúsculas, minúsculas, números e símbolos
										</FormHelperText>
									</Box>
									<Box id="register-email" margin='10px 40px'>
										<FormLabel htmlFor='email' marginLeft='10px'>e-Mail:</FormLabel>
										<Input
											type='email' {...register('email')}
											placeholder='Ex: nome.sobrenome@gmail.com'
											maxWidth='27vw' background='green.100'
										/>
									</Box>
									<Box id="register-pass" margin='10px 40px'>
										<FormLabel htmlFor='password' marginLeft='10px'>Senha:</FormLabel>
										<InputGroup>
											<Input
												type={showPass ? 'text' : 'password'} {...register('password')}
												placeholder='Jamais compartilhe sua senha!'
												maxLength='18' maxWidth='27vw' background='green.100'
											/>
											<InputRightElement width="72px">
												<Button onClick={handleShowPass} h="28px" size="sm" background='green.100'>
													{showPass ? <FaEyeSlash size='20'/> : <FaEye size='20'/>}
												</Button>
											</InputRightElement>
										</InputGroup>
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
										<Select
											placeholder='Selecione um Estado' {...register('uf')}
											minWidth='230px' background='green.100'
										>
											{stateOptionsRender()}
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
										isLoading={loadingButton}
										type='submit'
									>
										Salvar
									</Button>
									<a href="/">
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
						</form>
					</Box>
				</Flex>
			</Flex>
		</body>
	)
}

export async function getServerSideProps(context) {

	const statesList = await getAllBrazilStates()

	return {
		props: {
			stateList: statesList
		}
	}
}
