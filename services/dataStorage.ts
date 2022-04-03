import { useState, useEffect } from 'react'


/**
*   ! LOCAL STORAGE methods
*? setItem('item_key', "item_value")
*  * save item on localStorage
*? getItem('item_key')
*  * get item from localStorage
*? removeItem('item_key')
*  * remove item from localStorage
**/
export function storeUserId(defaultId = 0) {
	// rendered on front-end
	const [user_id] = useState(null)

	// rendered on back-end
	useEffect(() => {
		localStorage.setItem('user_id', String(defaultId))
	},
		[user_id]
	)
}

export function removeUserId() {
	const [user_id] = useState(null)

	useEffect(() => {
		localStorage.removeItem('user_id')
	},
		[user_id]
	)
}

export function getStoredUserId() {
	const [value] = useState(null)

	useEffect(() => {
		localStorage.getItem('user_id')
	},
		[value]
	)

	return value
}

export function storeUserToken(defaultToken='') {
	const [token] = useState(null)

	useEffect(() => {
		localStorage.setItem('user_token', String(defaultToken))
	},
		[token]
	)
}

export function removeUserToken() {
	const [token] = useState(null)

	useEffect(() => {
		localStorage.removeItem('user_token')
	},
		[token]
	)
}

export function getStoredUserToken() {
	const [value] = useState(null)

	useEffect(() => {
		localStorage.getItem('user_token')
	},
		[value]
	)

	return value
}
