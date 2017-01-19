const fs = require('fs')
const Metalsmith = require('metalsmith')
const minimatch = require('minimatch')
const render = require('consolidate').handlebars.render
const query = require('./query.js')

const cfgFileName = 'grow.config.json'

/**
 * Generate the final project using template and user input datas
 *
 * @param  {Boolean}  inplace    Whether to render files in current folder
 * @param  {String}   name       The name of the project
 * @param  {String}   tmpPath    Temp folder holding the downloaded template
 * @param  {String}   targetPath Target path for the generated project
 * @param  {Function} cb         Callback called when finished, err for parameter
 */
function compile(inPlace, name, tmpPath, targetPath, cb) {
  // read config file
  const config = getConfig(tmpPath)

  // use user input name for no default name situation
  if (config.ask.hasOwnProperty('name')) {
    if (!config.ask.name.default) {
      config.ask.name.default = name
    }
  }

  let dest = `${targetPath}/${name}`
  if (inPlace) {
    dest = `${targetPath}`
  }

  // compile
  Metalsmith(tmpPath)
    .use(ask(config.ask))
    .use(filter(config.filters))
    .use(cleanConfigFile(cfgFileName))
    .use(renderTpl())
    .clean(false)
    .source('.')
    .destination(dest)
    .build(err => cb(err))
}

/**
 * Get grow.config.js file
 */
function getConfig(tmpPath) {
  const _path = `${tmpPath}/${cfgFileName}`

  return JSON.parse(fs.readFileSync(_path, 'utf8'))
}

/**
 * Ask user questions using inquirer.js - [metalsmith plugin]
 * 
 * @return {Function} A metalsmith plugin function
 */
function ask(askData) {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()
    
    query(askData).then(answer => {
      Object.keys(answer).forEach(key => {
        metadata[key] = answer[key]
      })
      cb()
    })
  }
}

/**
 * Filter file - [metalsmith plugin]
 * 
 * @param  {Object} filters filters field in config files
 * @return {Function} A metalsmith plugin function     
 */
function filter(filters) {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()

    if (!filters) return cb()

    Object.keys(filters).forEach(glob => {
      Object.keys(files).forEach(file => {
        if (minimatch(file, glob, { dot: true })) {
          const _v = filters[glob]

          if (!metadata[_v]) {
            delete files[file]
          }
        }
      })
    })
    cb()
  }
}

/**
 * Clean grow config file - [metalsmith plugin]
 * 
 * @param  {String} filename Name of the config file
 * @return {Function} A metalsmith plugin function
 */
function cleanConfigFile(filename) {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()

    Object.keys(files).forEach(file => {
      if (minimatch(file, filename, { dot: true })) {
        delete files[file]
      }
    })
    cb()
  }
}

/**
 * Render template using the data from previous step - [metalsmith plugin]
 * 
 * @return {Function} A metalsmith plugin function
 */
function renderTpl() {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()

    Object.keys(files).forEach(file => {
      const str = files[file].contents.toString()

      render(str, metadata, (err, res) => {
        if (err) return cb(err)
        files[file].contents = new Buffer(res)
        cb()
      })
    })
  }
}

module.exports = compile
