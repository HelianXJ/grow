const inquirer = require('inquirer')

/**
 * Make a prompt to the user using the config data
 * 
 * @param  {Array} askData
 * @return {Promise}
 */

function query(askData) {
  const _askData = parsePrompt(askData)
  return inquirer.prompt(_askData)
}

/**
 * Take grow.config.js config data and output the prompt configs
 * 
 * @param  {Object} askData
 * @return {Array}         
 */

function parsePrompt(askData) {
  return Object.keys(askData).map(name => {
    return Object.assign({}, askData[name], {
      name: name
    })
  })
}

module.exports = query