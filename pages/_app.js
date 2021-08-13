//import 'bootstrap/dist/css/bootstrap.css'
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react'
import theme from "../config/theme.ts"
import "./styles/globals.css"


function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider resetCSS theme={theme}>
				<ColorModeProvider
					options={ {} }
				>
					<ColorModeScript/>

					<Component {...pageProps}/>
				</ColorModeProvider>
		</ChakraProvider>
	)
}

export default MyApp
