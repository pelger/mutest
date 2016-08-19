const {create} = require('mu')
const {define, act} = create(require('./routes'))

const ns = 'my-service'

define({ns, cmd: 'action1'}, ({data}, cb) => {
  cb(null, {data})
})

define({ns, cmd: 'action2'}, ({data}, cb) => {
  act({ns: 'another-service', ...data}, cb)
})
