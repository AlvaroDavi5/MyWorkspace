//var fs = require('fs')
import { getApodImages } from "../../services/get_data.ts"


// this gets called on build proccess (statically rendering)
export async function getStaticProps() {

	const query = getApodImages()

	// fetch data from external API
	const res = await fetch(query)
	const data = await res.json()

	/*
	fs.writeFile("../../data/request.json", String(data), function(err) {
		if (err) {
			console.log(err)
		}
	})
	*/

	// Pass data to the page via props
	return { props: { data } }
}

export default function About({ data }) {
	return (
		<div>
			<h1>
				About
			</h1>
			<br/>
			<code>
				{String(data['title'])}
			</code>
		</div>
	)
}
