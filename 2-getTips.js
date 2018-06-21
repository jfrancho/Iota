var IOTA = require('iota.lib.js')

// Create IOTA instance direcly with provider
var iota = new IOTA({'provider': 'https://node.iota-tangle.io:14265'})

iota.utils.getTips(function(error, success) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(success)
  }
})
