const chalk = require('chalk')

function log(text) {
  const styled = chalk.white(`[ LOG ]`)
  console.log(`${styled} : ${text}`)
}

/**
 * Log error info and exit
 *
 * The msg param could be a {String} or an Error instance
 */
function error(msg) {
  const styled = chalk.red(`[ ERROR ]`)
  let text = msg instanceof Error ? msg.message : msg

  console.log(`\n${styled} : ${text}`)
  process.exit(1)
}

function success(text) {
  const styled = chalk.green(`[ SUCCESS ]`)
  console.log(`${styled} : ${text}`)
}

module.exports = {
  log,
  error,
  success
}