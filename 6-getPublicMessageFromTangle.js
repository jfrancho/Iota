var IOTA = require('iota.lib.js')
var Mam = require('mam.client.js')

var iota = new IOTA({'provider': 'https://node.iota-tangle.io:14265'})
var hash = process.argv[2]
let mamState = Mam.init(iota)

const convertAndDisplayMessage = (msg) => { console.log(iota.utils.fromTrytes(msg)) }

const getMessage = async () => {
  try {
    var message = await Mam.fetch(
      hash,
      'public',
      null,
      convertAndDisplayMessage,
    )
  }
  catch(e) {
    console.error(e)
  }
}

console.log('Transaction address to be decoded: ', hash)
getMessage()
