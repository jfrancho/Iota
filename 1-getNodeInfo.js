var IOTA = require('iota.lib.js')

// Create IOTA instance direcly with provider
var iota = new IOTA({'provider': 'https://node.iota-tangle.io:14265'})

iota.api.getNodeInfo(function(error, success) {
  if (error) {
    console.error(error)
  } else {
    console.log(success)
  }
});
