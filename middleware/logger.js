// Middleware, this runs every time a request is made, has access to request/result objects
const moment = require('moment') // date formatting module
const logger = (req, res, next) => {
	console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
	next()
}

module.exports = logger