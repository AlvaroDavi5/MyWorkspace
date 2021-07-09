require('dotenv')


// API data request
function getApodImages(count:String, date:String, start_date:String, end_date:String) {

	let query = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`

	return query
}


export { getApodImages }
