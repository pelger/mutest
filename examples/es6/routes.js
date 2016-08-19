import {create} from 'mu'
import {createHttp, createLocal} from 'mu/transports'

const {route, mu} = create()
const local = createLocal()
const http = createHttp()

route({ns: 'cmp'}, local)
route('*', http)

local.listen()
http.listen(8080)

export default mu
