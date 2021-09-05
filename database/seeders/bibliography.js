const bibliography = require('../models/bibliography.js')


const insert = bibliography.create({
	user_id: 1,
	author: "Alan Turing",
	name: "Máquinas Podem Pensar?",
	publication_date: "1957-10-01"
})


module.exports = insert;
