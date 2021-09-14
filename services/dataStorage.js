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
function storeUserId(defaultId=0) {
	// rendered on front-end
	const [user_id] = useState(null)

	// rendered on back-end
	useEffect(() => {
		localStorage.setItem('user_id', Number(defaultId))
	},
		[user_id]
	)
}

function removeUserId() {
	const [user_id] = useState(null)

	useEffect(() => {
		localStorage.removeItem('user_id')
	},
		[user_id]
	)
}

function getStoredUserId() {
	const [value] = useState(null)

	useEffect(() => {
		localStorage.getItem('user_id')
	},
		[value]
	)

	return value
}

function storeUserEmail(defaultEmail='') {
	const [email] = useState(null)

	useEffect(() => {
		localStorage.setItem('user_email', Number(defaultEmail))
	},
		[email]
	)
}

function removeUserEmail() {
	const [email] = useState(null)

	useEffect(() => {
		localStorage.removeItem('user_email')
	},
		[email]
	)
}

function getStoredUserEmail() {
	const [value] = useState(null)

	useEffect(() => {
		localStorage.getItem('user_email')
	},
		[value]
	)

	return value
}


export { storeUserId, removeUserId, getStoredUserId, storeUserEmail, removeUserEmail, getStoredUserEmail }
