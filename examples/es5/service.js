var mu = require('mu')(require('./routes'))

mu.define({ns: 'my-service', cmd: 'action1'}, function (args, cb) {
  cb(null, {data: 'data'})
})

mu.define({ns: 'my-service', cmd: 'action2'}, function (args, cb) {
  cb(null, {data: 'data'})
})

mu.define({ns: 'my-service', cmd: 'action3'}, function (args, cb) {
  mu.act({ns: 'another-service', data: args.data}, cb)
})
