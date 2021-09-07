const UserPreferences = require("../models/user_preferences.js")


const insert = UserPreferences.create({
	user_id: 1,
	image_path: "./aqui/essa.png",
	default_theme: 2
})


module.exports = insert;
