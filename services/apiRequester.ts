import fs from 'fs'


function readJSONFile(filePath:string) {

	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if(err) {
				reject(err)
			}
			else {
				resolve(JSON.parse(data.toString()))
			}
		})
	})
}

async function getAllBrazilStates() {

	try {
		let query = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
		const data = await query.json()

		return data
	}
	catch(error) {
		return readJSONFile("./src/template/BrazilStates.json")
	}
}

async function getBrazilState(uf:String) {

	try {
		let query = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`)
		const data = await query.json()

		return data
	}
	catch(error) {
		return {
			data: null,
			error: error
		}
	}
}


export { getAllBrazilStates, getBrazilState }
