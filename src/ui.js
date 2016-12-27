const ora = require('ora')
const logger = require('./logger.js')

/**
 * Spinner
 */

exports.download = ora({
  text: 'downloading template'
})

exports.compile = {
  start() {
    logger.log('compiling now ...')
  },

  succeed() {
    logger.log('compiling finished!')
  }
}
