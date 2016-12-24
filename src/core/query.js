const inquirer = require('inquirer')

/**
 * Make a prompt to the user using the config data
 * 
 * @param  {Array} config
 * @return {Promise}
 */

function query(config) {
  const _config = parsePrompt(config)
  return inquirer.prompt(_config)
}

/**
 * Take grow.config.js config data and output the prompt configs
 * 
 * @param  {Object} config
 * @return {Array}         
 */

function parsePrompt(config) {
  return Object.keys(config.ask).map(name => {
    return Object.assign({}, config.ask[name], {
      name: name
    })
  })
}

module.exports = query