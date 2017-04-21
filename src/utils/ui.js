const ora = require('ora')
const { log } = require('./logger.js')

/**
 * Spinner
 */

exports.download = ora({
  text: 'downloading template'
})

exports.compile = {
  start() {
    log('compiling now ...')
  },

  fail() {
    log('compiling failed!')
  },

  succeed() {
    log('compiling finished!')
  }
}

exports.fetchRepos = ora({
  text: 'Fetching templates available on your GitHub'
})
