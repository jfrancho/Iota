var IOTA = require('iota.lib.js')
var Mam = require('mam.client.js')

// Go to www.thetangle.org/mam to check the explorer

// Create IOTA instance direcly with provider
var iota = new IOTA({'provider': 'https://node.iota-tangle.io:14265'})

// Initialize MAM State
let mamState = Mam.init(iota)

// Publish to tangle
const publish = async packet => {
  try {
    // Create MAM Payload - String of Trytes
    const message = Mam.create(mamState, iota.utils.toTrytes(packet))
    // Save new mamState
    mamState = message.state
    console.log('Root: ', message.root)
    console.log('Address: ', message.address)
    // Attach the payload.
    await Mam.attach(message.payload, message.address)

    // Fetch Stream Async to Test
    const resp = await Mam.fetch(message.root, 'public', null, console.log)
    console.log(resp)
  }
  catch(e) {
    console.error(e)
  }

}

publish('Potato !')
