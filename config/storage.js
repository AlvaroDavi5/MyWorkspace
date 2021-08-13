import { useState, useEffect } from 'react'
import light from "./colors/light.ts"
import dark from "./colors/dark.ts"


const colorSchema =  [light.colors, dark.colors]

/**
*   ! LOCAL STORAGE methods
*? setItem('item_key', "item_value")
*  * save item on localStorage
*? getItem('item_key')
*  * get item from localStorage
*? removeItem('item_key')
*  * remove item from localStorage
**/
function storeTheme(defaultTheme=0) {
	// rendered on front-end
	const [theme] = useState(null)

	// rendered on back-end
	useEffect(() => {
		localStorage.setItem('theme_value', Number(defaultTheme))
	},
		[theme]
	)
}

function removeTheme() {
	const [theme] = useState(null)

	useEffect(() => {
		localStorage.removeItem('theme_value')
	},
		[theme]
	)
}

function getStoredTheme() {
	const [value] = useState(null)

	useEffect(() => {
		localStorage.getItem('theme_value')
	},
		[value]
	)

	return colorSchema[value]
}


export { storeTheme, removeTheme, getStoredTheme }
