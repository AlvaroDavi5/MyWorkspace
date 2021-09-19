import axios from 'axios'


async function getPublicationsByCategory(category:String) {

	let query = await axios.get(`http://servicodados.ibge.gov.br/api/v1/publicacoes/${category}`)
	const data = query.data

	return data
}

async function getNews() {

	const publicationsRequest = await fetch("http://servicodados.ibge.gov.br/api/v3/noticias/")
	const publicationsJson = await publicationsRequest.json()

	return publicationsJson
}

async function createTaskAxios() {

	try {
		axios.post(
			"http://localhost:8080/api/users/1/tasks",
			{
				user_id: 1,
				name: "Marcar PF",
				deadline_date: "2021-10-24T00:00:00.000Z",
				deadline_time: "05:23:10",
				description: "Espero que todos tirem 0!"
			}
		)
		return true
	} catch ( message ) {
		return false
	}
}


export { getPublicationsByCategory, getNews, createTaskAxios }
