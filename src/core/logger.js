const chalk = require('chalk')

exports.log = function (text) {
  const styled = chalk.white(`- grow log`)
  console.log(`${styled} : ${text}`)
}

/**
 * Log error info and exit
 *
 * The msg param could be a {String} or an Error instance
 */
exports.error = function (msg) {
  const styled = chalk.white(`- grow error`)
  let text = msg instanceof Error ? msg.msg.trim() : msg

  console.log(`${styled} : ${text}`)
  process.exit(1)
}

exports.success = function (text) {
  const styled = chalk.white(`- grow success`)
  console.log(`${styled} : ${text}`)
}

module.exports = {
  log,
  error,
  success
}