import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { colors } from "./storage.js"


const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints(
	{
		sm: "40em",
		md: "52em",
		lg: "64em",
		xl: "80em"
	}
)

const theme = extendTheme(
	{
		useSystemColorMode: true,
		//initialColorMode: 'light',
		colors: colors, // color palette
		fonts,
		breakpoints: breakpoints,
		icons: {
			logo: {},
			add: {},
			remove: {},
			search: {}
		}
	}
)

export default theme
