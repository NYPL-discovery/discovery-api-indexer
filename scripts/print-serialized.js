/**
 * Helper script for printing the index serialization of any record.
 *
 * Usage
 *
 * node scripts/print-serialized --bnum [bnum] --profile [aws profile] \
 *   --envfile [path to local db creds file]
 */

const DiscoveryModels = require('discovery-store-models')

const ResourceSerializer = require('../lib/es-serializer').ResourceSerializer
const envConfigHelper = require('../lib/env-config-helper')

// Parsc cmd line opts:
var argv = require('optimist')
  .usage('Index resources index with various types\nUsage: $0 -type TYPE')
  .default({
    bnum: null
  })
  .describe('bnum', 'Specify single bnum to display')
  .argv

// Get serialization for single bib:
if (argv.bnum) {
  envConfigHelper.init({ discoveryStoreModels: DiscoveryModels })
    .then(() => DiscoveryModels.Bib.byId(argv.bnum))
    .then(ResourceSerializer.serialize)
    .then((doc) => {
      // console.info(JSON.stringify(doc, null, 2))
      process.stdout.write(JSON.stringify(doc, null, 2))
      process.exit()
    })
}
