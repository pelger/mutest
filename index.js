var router = require('./lib/router')

function mu (opts) {
  opts = opts || {}

  // DMC: important for router pattern
  if (opts.mu) { return opts.mu }

  var routes = router()

  var exp = {
    route: route,
    define: define,
    act: act,
    list: list // DMC: important for http api layer integration
  }
  exp.mu = exp // DMC: api: es6 (see examples)
  return exp

  function route (pattern, transport) {
    routes.add(pattern, transport)
  }

  function define (pattern, cb) {
    var transport = routes.lookup(pattern)
    transport.register(pattern, cb)
  }

  function act (args, cb) {
    var transport = routes.lookup(args)
    if (!transport) {
      cb(Error('No route found for pattern, register a default route'))
      return
    }
    transport.request(args, cb)
  }

  function list () {
    return routes.list({patterns: true})
  }
}

mu.create = mu // DMC: api: es6 (see examples)

module.exports = mu
