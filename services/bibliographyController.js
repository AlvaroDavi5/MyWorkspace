const connection = require("../database/connection.js")
const Bibliographies = require("../database/models/bibliographies.js")


async function createBibliography(user_id, author, name, publication_date, returnId) {
	Bibliographies.init(connection)

	try {
		const bibliography = await Bibliographies.create(
			{
				user_id: user_id,
				author: author,
				name: name,
				publication_date: publication_date,
			}
		)

		if (returnId == true) {
			return bibliography.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getBibliographyById(id) {
	Bibliographies.init(connection)

	try {
		const bibliography = await Bibliographies.findByPk(id)

		return bibliography
	}
	catch ({ message }) {
		return null
	}
}

async function getAllBibliographies() {
	Bibliographies.init(connection)

	try {
		const bibliographies = await Bibliographies.findAll()

		return bibliographies
	}
	catch ({ message }) {
		return null
	}
}

async function getBibliographyIdByUserId(user_id) {
	Bibliographies.init(connection)

	try {
		const bibliography = await Bibliographies.findOne({
			where: {
				user_id: user_id
			}
		})

		return bibliography.id
	}
	catch ({ message }) {
		return null
	}
}

async function updateBibliography(bibliography, user_id, author, name, publication_date) {
	Bibliographies.init(connection)

	try {
		if (user_id) { bibliography.user_id = user_id }
		if (author) { bibliography.author = author }
		if (name) { bibliography.name = name }
		if (publication_date) { bibliography.publication_date = publication_date }

		await bibliography.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteBibliography(bibliography) {
	Bibliographies.init(connection)

	try {
		await bibliography.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createBibliography, getBibliographyById, getAllBibliographies, getBibliographyIdByUserId, updateBibliography, deleteBibliography }
