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

  fail() {
    logger.log('compiling failed!')
  },

  succeed() {
    logger.log('compiling finished!')
  }
}

exports.fetchRepos = ora({
  text: 'Fetching templates available on your GitHub'
})