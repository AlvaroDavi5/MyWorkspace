const Users = require("../models/users.js")


const insert = Users.create({
	name: "Alvaro",
	email: "alvaro-alves@nomail.edu",
	password: "senha_da_nasa123",
	phone: "27999999999",
	cpf: "000.123.111-60",
	uf: "BA"
})


module.exports = insert;
