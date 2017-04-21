const chalk = require('chalk')

exports.log = function(text) {
  const styled = chalk.white(`📄`)
  console.log(`${styled} : ${text}`)
}

/**
 * Log error info and exit
 *
 * The msg param could be a {String} or an Error instance
 */
exports.error = function(msg) {
  const styled = chalk.red(`❌`)
  const text = msg instanceof Error ? msg.message : msg

  console.log(`\n${styled} : ${text}`)
  process.exit(1)
}

exports.success = function(text) {
  const styled = chalk.green(`✅`)
  console.log(`${styled} : ${text}`)
}
