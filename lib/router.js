var bloomrun = require('bloomrun')

module.exports = router

function router () {
  var bloom = bloomrun({indexing: 'depth'})
  // DMC: todo, rm defaultTransport when bloomrun supports catch alls
  var defaultTransport
  return {
    add: add,
    list: list,
    lookup: lookup
  }

  function add (pattern, transport) {
    // DMC: todo, rm when bloomrun supports catch alls
    if (pattern === '*') {
      defaultTransport = transport
      return
    }
    bloom.add(pattern, transport)
  }

  function list () {
    return bloom.list()
  }

  function lookup (pattern, cb) {
    // DMC: todo, rm || defaultTransport when bloomrun supports catch alls
    return bloom.lookup(pattern) || defaultTransport
  }

}

