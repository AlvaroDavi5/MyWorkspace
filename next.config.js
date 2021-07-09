const withImages = require('next-images')


module.exports = withImages(
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
)
