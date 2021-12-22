//import 'bootstrap/dist/css/bootstrap.css'
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react'
import theme from "../config/theme.ts"
import AuthProvider from "../pages/auth/auth_context.jsx"
import "./styles/globals.css"


function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeScript/>
			<ColorModeProvider
				options={ {} }
			>
				<AuthProvider>
					<Component {...pageProps}/>
				</AuthProvider>
			</ColorModeProvider>
		</ChakraProvider>
	)
}

export default MyApp
