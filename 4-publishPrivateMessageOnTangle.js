var IOTA = require('iota.lib.js')
var Mam = require('mam.client.js')

// Create IOTA instance direcly with provider
var iota = new IOTA({'provider': 'https://node.iota-tangle.io:14265'});

// Initialize MAM State
let mamState = Mam.init(iota)

// Set channel mode to private
mamState = Mam.changeMode(mamState, 'private')

iota.api.getNewAddress(generateSeed, { index: 0 }, (error, derived) => {
  if (error) reject(error);
  else resolve(derived);
});

generateSeed() {
  let seed         = '';
  let rdmArray     = new Uint32Array(1);
  let createdChars = 0;
  while (createdChars < 81) {
    window.crypto.getRandomValues(rdmArray);
    rdmArray[0] = (rdmArray[0] % 33) + 57;
    if ((rdmArray[0] >= 65 && rdmArray[0] <= 90) || rdmArray[0] == 57) {
      seed += String.fromCharCode(rdmArray[0]);
      createdChars += 1;
    }
  }
  return seed;
}



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
      'private',
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
