const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withPwa = require('next-pwa')


module.exports = withPlugins([
	[
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
		withPwa,
		{
			pwa: {
				disable: process.env.NODE_ENV === 'development',
				dest: 'public',
				register: true,
				sw: '/sw.js'
			}
		}
	]
	// other plugin here
])
