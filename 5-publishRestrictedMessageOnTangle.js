var IOTA = require('iota.lib.js');
var Mam = require('mam.client.js');

// Create IOTA instance direcly with provider
var iota = new IOTA({'provider': 'https://node.iota-tangle.io:14265'});

// Set channel mode
let mamState = Mam.init(iota)
// Set messages mode to private and secure it with the following key
mamState = Mam.changeMode(mamState, 'private', 'mypassword')


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
    const resp = await Mam.fetch(
      message.root,
      'restricted',
      null,
      console.log
    )
    console.log(resp);
  }
  catch(e) {
    console.error(e);
  }
}

publish('Potato !')
