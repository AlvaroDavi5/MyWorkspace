const bibliographies = require("../models/bibliographies.js")


const insert = bibliographies.create({
	user_id: 1,
	author: "Alan Turing",
	name: "Máquinas Podem Pensar?",
	publication_date: "1957-10-01"
})


module.exports = insert;
