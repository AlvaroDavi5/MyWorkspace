import { createContext, useState } from 'react'
import Router from 'next/router'
import { useToast } from '@chakra-ui/react'
import { setCookie } from 'nookies'
import axios from 'axios'


export const AuthContext = createContext({})

export const toastStatuses = [
	['success', "Login realizado com sucesso", "Tudo certo! Aguarde enquanto carregamos seu espaço de trabalho..."],
	['error', "Login ou senha incorretos", "Por favor, verifique suas credenciais e tente novamente."],
	['warning', "Oops!", "Algo inesperado aconteceu, por favor, tente novamente dentro de alguns instantes!"]
]

export default function AuthProvider({ children }) {
	const toast = useToast()
	const [ user, setUser ] = useState(null)
	const isAuthenticated = !!user

	async function SignIn({ email='', password='' }) {
		try {
			// // change API URL after deploy | cloud database | hosting service implementation
			const { data, ...reqData } = await axios.post(
				"http://localhost:8080/api/auth/login/",
				{
					email,
					password
				}
			)
			// reloading user data
			await setUser(data.data.user)

			// send feedback to user
			if (!!(data.data.user['id'])) {
				toast({
					status: toastStatuses[0][0],
					title: toastStatuses[0][1],
					description: toastStatuses[0][2],
					duration: 1500,
					isClosable: true
				})
			}

			// saving user auth on cookies
			setCookie(undefined, 'myworkspace-user_id', data.data.user['id'], {
				maxAge: 60 * 60 * 1 // 1 hour
			})

			// redirecting route
			Router.push(`/users/${data.data.user['id']}`)			
		}
		catch (error) {
			toast({
				status: toastStatuses[1][0],
				title: toastStatuses[1][1],
				description: toastStatuses[1][2],
				duration: 1500,
				isClosable: true
			})
			console.log(error)
		}

		return user
	}

	return (
		<AuthContext.Provider value={ {user, isAuthenticated, SignIn} }>
			{ children }
		</AuthContext.Provider>
	)
}

export async function getServerSideProps(context) {

	return {
		context: context
	}
}
