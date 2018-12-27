import error401 from './routes/error/error401.mjs'
import error403 from './routes/error/error403.mjs'
import error404 from './routes/error/error404.mjs'
import index from './routes/index/index.mjs'
import hello from './routes/hello/hello.mjs'


let handlers = {}

/* Status responses */
handlers.ping = (data, callback) => { callback(200) }
handlers.error401 = (data, callback) => { callback(401, error401) }
handlers.error403 = (data, callback) => { callback(403, error403) }
handlers.error404 = (data, callback) => { callback(404, error404) }

/* Index response */
handlers.index = (data, callback) => {
	callback(200, index)
}

/* Hello response */
handlers.hello = (data, callback) => {
	callback(200, hello)
}

const router = {
	"ping": handlers.ping,
	"error401": handlers.error401,
	"error403": handlers.error403,
	"error404": handlers.error404,

	"": handlers.index,
	"home": handlers.index,
	"index": handlers.index,
	"hello": handlers.hello,
}

export default router
