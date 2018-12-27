import http from 'http'
import https from 'https'
import url from 'url'
import string_decoder from 'string_decoder'; const { StringDecoder } = string_decoder
import fs from 'fs'
import config from './config.mjs'
import router from './router.mjs'

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
	unifiedServer(req, res)
})

// Start the HTTP server
httpServer.listen(config.httpPort, () => {
	console.log(`

    \x1b[1mNodeJS API Server 1\x1b[0m
    Port: \x1b[33m${config.httpPort}\x1b[0m
    Environment: \x1b[32m${config.envName}\x1b[0m
    SSL Encrypted: \x1b[35mFalse\x1b[0m`)
})

// Instantiate the HTTPS server
const httpsServerOptions = {
	'key': fs.readFileSync('./https/key.pem'),
	'cert': fs.readFileSync('./https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
	unifiedServer(req, res)
})

// Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
	console.log(`

    \x1b[1mNodeJS API Server 2\x1b[0m
    Port: \x1b[33m${config.httpsPort}\x1b[0m
    Environment: \x1b[32m${config.envName}\x1b[0m
    SSL Encrypted: \x1b[35mTrue\x1b[0m

	`)
})

// All the server logic for the http and https server
const unifiedServer = (req, res) => {
	// Get URL and parse it
	const parsedUrl = url.parse(req.url, true)

	// Get the path
	const path = parsedUrl.pathname
	const trimmedPath = path.replace(/^\/+|\/+$/g, '')

	// Get the query string as an object
	const queryStringObject = parsedUrl.query

	// Get the HTTP Method
	const method = req.method.toLowerCase()

	// Get the headers as an object
	const headers = req.headers

	// Get the payload if there is any
	const decoder = new StringDecoder('utf-8')
	var buffer = ''
	req.on('data', (data) => {
		buffer += decoder.write(data)
	})

	req.on('end', () => {
		buffer += decoder.end()

		// Chose the handler the request should go to
		var chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : router['error404']

		// Construct the data object to send to the router handler
		var data = {
			'trimmedPath': trimmedPath,
			'queryStringObject': queryStringObject,
			'method': method,
			'headers': headers,
			'payload': buffer
		}

		// Route the request to the handler specified in the router
		chosenHandler(data, (statusCode, payload) => {
			// Use the status code called back by the handler, or use the default to 200
			statusCode = typeof (statusCode) == 'number' ? statusCode : 200

			//Use the payload called back by the handler, or use the default to an empty object
			payload = typeof (payload) == 'object' ? payload : {}

			// Convert the payload to a string
			var payloadString = JSON.stringify(payload)

			// Return the response
			res.setHeader('Content-Type', 'application/json')
			res.writeHead(statusCode)
			res.end(payloadString)

			// Log the path
			console.log(statusCode, payloadString)
		})
	})
}


// Define handlers
/* var handlers = {}
handlers.sample = (data, callback) => {
	callback(406, { 'name': 'sample handler' })
}
handlers.ping = (data, callback) => {
	callback(200)
}
handlers.error404 = (data, callback) => {
	callback(404, { 'name': 'error404 handler' })
} */

// Define router request
/* var router = {
	'sample': handlers.sample,
	'ping': handlers.ping
} */