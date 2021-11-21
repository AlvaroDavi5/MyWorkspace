import axios from 'axios'


async function getAllBrazilStates() {

	let query = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	const data = await query.json()

	return data
}

async function getBrazilState(uf:String) {

	let query = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`)
	const data = await query.json()

	return data
}


export { getAllBrazilStates, getBrazilState }
