const {create} = require('mu')
const {createHttp, createLocal} = require('mu/transports')

const {route, mu} = create()
const local = createLocal()
const http = createHttp()

route({ns: 'cmp'}, local)
route('*', http)

local.listen()
http.listen(8080)

module.exports = mu
