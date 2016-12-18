const fs = require('fs')
const util = require('util')

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

  list() {
    return util.inspect(this.data, {
      colors: true,
      depth: null
    })
  }
}


module.exports = new Config()
