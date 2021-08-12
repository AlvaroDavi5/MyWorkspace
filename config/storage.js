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

const colorSchema = {
	light: 0,
	dark: 1,

	index: 0,
	marine: [colors.marine, colors.primary],
	clear_lake: [colors.clear_lake, colors.dark_forest]
}

//let localStorageThemeMode = localStorage.getItem('')

export { colors, colorSchema }
