var mu = require('mu')()
var local = require('mu/transports/local')()
var http = require('mu/transports/http')()

mu.route({ns: 'cmp'}, local)
mu.route('*', http)

local.listen()
http.listen(8080)

module.exports = mu
