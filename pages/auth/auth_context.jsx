import { createContext, useState } from 'react'
import Router from 'next/router'
import { setCookie } from 'nookies'
import axios from 'axios'


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
	const [ user, setUser ] = useState(null)
	const isAuthenticated = !!user

	async function SingIn({ email='', password='' }) {
		const { data, ...reqData } = await axios.post(
			"http://localhost:8080/api/users/",
			{
				email,
				password
			}
		)
		// reloading user data
		await setUser(data.data.user)

		// saving user auth on cookies
		setCookie(undefined, 'myworkspace-user_id', user['id'], {
			maxAge: 60 * 60 * 1, // 1 hour
		})

		// redirecting route
		Router.push(`/users/${user['id']}`)
	}

	return (
		<AuthContext.Provider value={ {user, isAuthenticated, SingIn} }>
			{ children }
		</AuthContext.Provider>
	)
}
