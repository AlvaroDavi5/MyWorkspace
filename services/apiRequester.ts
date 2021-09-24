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


export { getPublicationsByCategory, getNews }
