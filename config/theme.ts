import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'


const fonts = { mono: `'Menlo', monospace` }

/* color palette */
const colors = {
	clear_lake: "#aef0d1",
	dark_forest: "#015249",
	primary: "#229052",
	secondary: "#03652e",
	marine: "#57bc90",
	feather: "#77c9d4",
	sleek_grey: "#a5a5af",
	highlight: "#d885db",
	accent: "#0901a7",
	success: "#2ddf00",
	danger: "#e60e0e",
	alert: "#e9bd09",
	calm: "#0a9ef3"
}

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
		//initialColorMode: "light",
		colors: colors,
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
