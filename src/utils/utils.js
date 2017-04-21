const os = require('os')
const fs = require('fs')
const uid = require('uid')
const inquirer = require('inquirer')

/**
 * Make tmp dir path
 */

exports.makeTmpDir = function() {
  return `${os.tmpdir()}/grow-template-cache-${uid()}`
}
exports.makeTmpDirDev = function() {
  return `./grow-template-cache-dev-${uid()}`
}

/**
 * Make GitHub repo URL
 */

exports.makeRepoURL = function(username, reponame) {
  return `${username}/${reponame}`
}

/**
 * Get the config file in a template
 */

exports.getConfig = function(projectPath, configFileName) {
  const _path = `${projectPath}/${configFileName}`
  let fileData

  try {
    fileData = fs.readFileSync(_path, 'utf8')
  } catch (e) {
    error(e)
  }

  return JSON.parse(fileData)
}

/**
 * Detect if there's readme inside given folder
 */

exports.detectReadme = function(projectPath) {
  const re = /^readme\.md$/i
  const files = fs.readdirSync(projectPath)

  let result = false
  files.forEach(file => {
    if (re.test(file)) {
      result = true
    }
  })

  return result
}

exports.isReadme = function(str) {
  const re = /^readme\.md$/i
  return re.test(str)
}

/**
 * Make a prompt to the user using the config data
 * 
 * @param  {Array}   askData
 * @return {Promise}
 */

exports.askUser = function(askData) {
  const _askData = Object.keys(askData).map(name => {
    return Object.assign({}, askData[name], {
      name: name
    })
  })

  return inquirer.prompt(_askData)
}
