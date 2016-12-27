const ora = require('ora')

/**
 * Spinner
 */

exports.download = ora({
  text: 'downloading template'
})

exports.compile = {
  start() {
    console.log('compiling now ...')
  },

  succeed() {
    console.log('compiling finished!')
  }
}
