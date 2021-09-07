const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/../.env.development.local'})


// API data request
function getApodImages(count:String, date:String, start_date:String, end_date:String) {

	let query = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`

	return query
}

async function getIBGEPublications(category:String) {
	const publicationsRequest = await fetch(`http://servicodados.ibge.gov.br/api/v1/publicacoes/${category}`)
	const publicationsJson = await publicationsRequest.json()

	return publicationsJson
}


export { getApodImages, getIBGEPublications }
