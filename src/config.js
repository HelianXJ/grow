const fs = require('fs')
const util = require('util')
const logger = require('./logger.js')

/**
 * Config file path
 */

// Windows users can't use this method, but who cares
const configPath = process.env.HOME + '/.growconfig'

/**
 * Config data
 */

class Config {
  constructor() {
    this.data = {}
    this.read()
  }

  read() {
    let config = {}
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    } catch (err) {
      // file not found
      if (err.code === 'ENOENT') {
        this.save()
      } else {
        throw err
      }
    }

    this.data = config
  }

  save() {
    fs.writeFileSync(
      configPath,
      JSON.stringify(this.data, null, 2),
      'utf8'
    )
  }

  getData() {
    if (!this.data.username) {
      logger.error('You have to set your GitHub username first, try using grow config --username xxx')
    }
    return this.data
  }

  setData(username) {
    this.data.username = username
    this.save()
  }

  list() {
    return util.inspect(this.data, {
      colors: true,
      depth: null
    })
  }
}

module.exports = new Config()
