const withPlugins = require('next-compose-plugins')
const withPwa = require('next-pwa')
const withImages = require('next-images')
const static_dotenv = require("./config/globals/static_dotenv.js")


module.exports = withPlugins([
	[
		/* allow import images from any dir (not working after withPlugins integration) */
		withImages,
		{
			fileExtensions: ["jpg", "jpeg", "png", "gif"],
			webpack: (config, options) => {
				config.module.rules.push(
					{
						test: /\.(jpeg|jpg|png|gif|svg|woff|woff2|eot|ttf)$/
					}
				)
				return config;
			}
		}
	],
	[
		/* run web pages as progressive webapp */
		withPwa,
		{
			pwa: {
				disable: static_dotenv.general.node_env === 'development',
				dest: 'public',
				register: true,
				skipWaiting: true,
				sw: '/sw.js' // service-worker
			}
		}
	]
	// others plugins here
])
