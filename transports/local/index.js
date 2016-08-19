var bloomrun = require('bloomrun')
var NOT_LISTENING = Error('local transport must be listening, call listen')
var NOT_FOUND = Error('pattern not found')
NOT_FOUND.code = NOT_FOUND.statusCode = 404

module.exports = function (opts) {
  var bloom = bloomrun({indexing: 'depth'})
  var listening = false

  return {
    request: request,
    register: register,
    listen: listen,
    close: close,
    destroy: destroy
  }

  function request (args, cb) {
    if (!listening) {
      throw NOT_LISTENING
    }
    var handler = bloom.lookup(args)
    if (!handler) {
      cb(NOT_FOUND)
      return
    }

    handler(args, cb)
  }

  function register (pattern, handler) {
    if (!listening) {
      throw NOT_LISTENING
    }
    bloom.add(pattern, handler)
  }

  function listen (cb) {
    listening = true
    if (cb) { cb() }
  }

  function close (cb) {
    listening = false
    if (cb) { cb() }
  }

  function destroy (cb) {
    close()
    bloom.list({patterns: true})
      .forEach(function (pattern) {
        bloom.remove(pattern)
      })
    if (cb) { cb() }
  }
}
