const withPlugins = require('next-compose-plugins')
const withPwa = require('next-pwa')
const withImages = require('next-images')
const dotenv = require('dotenv') // use environment variables to save sesitive data like API key
dotenv.config({path:__dirname+'/./.env.development.local'})


module.exports = withPlugins([
	[
		/* allow import images from any dir */
		withImages,
		{
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
				disable: process.env.NODE_ENV === 'development',
				dest: 'public',
				register: true,
				skipWaiting: true,
				sw: '/sw.js' // service-worker
			}
		}
	]
	// others plugins here
])
