const projects = require("../models/projects.js")


const insert = projects.create({
	user_id: 1,
	name: "Construir um App",
})


module.exports = insert;
