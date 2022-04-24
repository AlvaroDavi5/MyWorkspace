import Bibliographies from "@root/database/models/bibliographies"


async function createBibliography(user_id: number, author: string, name: string, publication_date: Date, return_id: boolean): Promise<number | boolean> {

	try {
		const bibliography = await Bibliographies.create(
			{
				user_id: user_id,
				author: author,
				name: name,
				publication_date: publication_date,
			}
		)

		if (return_id == true) {
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

async function getBibliographyById(id: number): Promise<Bibliographies | null> {

	try {
		const bibliography = await Bibliographies.findByPk(id)

		return bibliography
	}
	catch ({ message }) {
		return null
	}
}

async function getAllBibliographies(): Promise<Bibliographies[] | Bibliographies | null> {

	try {
		const bibliographies = await Bibliographies.findAll()

		return bibliographies
	}
	catch ({ message }) {
		return null
	}
}

async function getBibliographiesByUserId(user_id: number): Promise<Bibliographies[] | null> {

	try {
		const bibliographies = await Bibliographies.findAll({
			where: {
				user_id: user_id
			}
		})

		return bibliographies
	}
	catch ({ message }) {
		return null
	}
}

async function getBibliographyIdByUserId(user_id: number): Promise<number | null> {

	try {
		const bibliography = await Bibliographies.findOne({
			where: {
				user_id: user_id
			}
		})

		if (!!bibliography?.id) {
			return bibliography.id
		}
		else {
			return 0
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updateBibliography(bibliography: Bibliographies | undefined | null, user_id: number, author: string, name: string, publication_date: Date): Promise<boolean> {

	try {
		if (user_id && bibliography) { bibliography.user_id = user_id }
		if (author && bibliography) { bibliography.author = author }
		if (name && bibliography) { bibliography.name = name }
		if (publication_date && bibliography) { bibliography.publication_date = publication_date }

		await bibliography?.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteBibliography(bibliography: Bibliographies | undefined | null): Promise<boolean> {

	try {
		await bibliography?.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


export { createBibliography, getBibliographyById, getAllBibliographies, getBibliographiesByUserId, getBibliographyIdByUserId, updateBibliography, deleteBibliography }
