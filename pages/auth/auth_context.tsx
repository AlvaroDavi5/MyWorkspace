import { createContext, useState } from 'react'
import { ReactElement } from 'react'
import Router from 'next/router'
import { useToast } from '@chakra-ui/react'
import { setCookie } from 'nookies'
import axios from 'axios'
import globals_variables from "@config/constants/modifiable.js"


export const AuthContext = createContext({})

export const toastStatuses = [
	['success', "Login realizado com sucesso", "Tudo certo! Aguarde enquanto carregamos seu espaço de trabalho..."],
	['error', "Login ou senha incorretos", "Por favor, verifique suas credenciais e tente novamente."],
	['warning', "Oops!", "Algo inesperado aconteceu, por favor, tente novamente dentro de alguns instantes!"]
]

export default function AuthProvider({ children }: { children: ReactElement }) {
	const toast = useToast()
	const [ user, setUser ] = useState(null)
	const isAuthenticated = !!user

	async function SignIn({ email='', password='' }) {
		try {
			// // change API URL after deploy | cloud database | hosting service implementation
			const { data, ...reqData } = await axios.post(
				`${globals_variables.general.app_url}/api/auth/login/`,
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
					status: 'success',
					title: toastStatuses[0][1],
					description: toastStatuses[0][2],
					duration: 1500,
					isClosable: true
				})
			}

			// generate user token
			const userToken = await axios.post(
				`${globals_variables.general.app_url}/api/auth/generate_token/`,
				{
					user_id: data.data.user['id'],
					user_email: email
				}
			)

			// saving user auth on cookies
			setCookie(undefined, "myworkspace-user_token", userToken.data.token, {
				maxAge: 60 * 60 * 3 // 3 hours
			})

			// redirecting route
			Router.push(`/users/${userToken.data.token}`)
		}
		catch (error) {
			toast({
				status: 'error',
				title: toastStatuses[1][1],
				description: toastStatuses[1][2],
				duration: 1500,
				isClosable: true
			})
			console.log(error)
		}
	}

	return (
		<AuthContext.Provider value={ {user, isAuthenticated, SignIn} }>
			{ children }
		</AuthContext.Provider>
	)
}

export async function getServerSideProps(context: any) {

	return {
		context: context
	}
}
