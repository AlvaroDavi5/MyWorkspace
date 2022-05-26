import 'regenerator-runtime/runtime'
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from "@config/theme"
import AuthProvider from "@pages/auth/auth_context"
import "./styles/globals.css"


function MyApp({ Component, pageProps }: AppProps) {
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
