var test = require('tape')
var createTransport = require('../')

test('listen', function (t) {
  t.plan(6)

  var transport = createTransport()

  t.throws(function () {
    transport.register({test: 'test'}, function () {})
  }, 'register will throw before listen')

  t.throws(function () {
    transport.request({test: 'test'}, function () {})
  }, 'request will will throw before listen')

  t.doesNotThrow(transport.listen, 'listen does not throw')

  transport.listen(function () {
    t.pass('calls callback if supplied')
  })

  t.doesNotThrow(function () {
    transport.register({test: 'test'}, function () {})
  }, 'register will not throw after listen')

  t.doesNotThrow(function () {
    transport.request({test: 'test'}, function () {})
  }, 'request will not throw after listen')

})

test('register -> request flow', function (t) {
  t.plan(2)

  var transport = createTransport()

  transport.listen()

  transport.register({ns: 'test', cmd: 'test'}, function (args, cb) {
    args.n += 1
    cb(null, args)
  })

  transport.request({ns: 'test', cmd: 'test', n: 1}, function (err, result) {
    t.error(err, 'request should not error')
    t.is(result.n, 2, 'result should be affected by logic in register handler')
  })
})

test('unmatched patterns', function (t) {
  t.plan(2)

  var transport = createTransport()

  transport.listen()

  transport.request({ns: 'test', cmd: 'test'}, function (err) {
    t.ok(err)
    t.is(err.code, 404, 'unmatched patterns pass an error object, with code 404')
  })

})

test('close', function (t) {
  t.plan(4)

  var transport = createTransport()

  transport.listen()

  t.doesNotThrow(transport.close, 'close does not throw')

  transport.close(function () {
    t.pass('calls callback if supplied')
  })

  t.throws(function () {
    transport.register({test: 'test'}, function () {})
  }, 'register will throw after close')

  t.throws(function () {
    transport.request({test: 'test'}, function () {})
  }, 'request will will throw after close')

})

test('destroy', function (t) {
  t.plan(2)

  var transport = createTransport()

  transport.listen()
  transport.register({test: 'test'}, function () {})
  transport.destroy()

  t.throws(function () {
    transport.register({test: 'test'}, function () {})
  }, 'register will throw after destroy')

  t.throws(function () {
    transport.request({test: 'test'}, function () {})
  }, 'request will will throw after destroy')

  transport.listen()

  transport.request({test: 'test'}, function (err) {
    t.ok(err)
    t.is(err.code, 404, 'destroy removes all patterns')
  })
})
