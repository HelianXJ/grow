const fs = require('fs')
const util = require('util')
const { error } = require('./utils/logger.js')

/**
 * Config file path
 */

// TODO: Windows user will complain about this
const configPath = process.env.HOME + '/.growconfig'

/**
 * Config data
 */

class Config {
  constructor(_path) {
    this.path = _path
    this.data = {}
    this._load()
  }

  save() {
    fs.writeFileSync(
      this.path,
      JSON.stringify(this.data, null, 2),
      'utf8'
    )
  }

  getData() {
    if (!this.data.username) {
      error('You have to set your GitHub username first, try using grow config --username xxx')
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

  _load() {
    try {
      this.data = JSON.parse(fs.readFileSync(this.path, 'utf8'))
    } catch (err) {
      // file not found
      if (err.code === 'ENOENT') {
        this.save()
      } else {
        throw err
      }
    }
  }
}

module.exports = new Config(configPath)
