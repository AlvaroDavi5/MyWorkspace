const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withPwa = require('next-pwa')


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
	// other plugin here
])
