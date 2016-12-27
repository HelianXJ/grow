const fs = require('fs')
const Metalsmith = require('metalsmith')
const minimatch = require('minimatch')
const render = require('consolidate').handlebars.render
const query = require('./query.js')

/**
 * Generate the final project using template and user input datas
 * 
 * @param  {String}   name       The name of the project
 * @param  {String}   tmpPath    Temp folder holding the downloaded template
 * @param  {String}   targetPath Target path for the generated project
 * @param  {Function} cb         Callback called when finished, err for parameter
 */
function compile(name, tmpPath, targetPath, cb) {
  // read config file
  const config = getConfig(tmpPath)

  // compile
  Metalsmith(tmpPath)
    .use(ask(config.ask))
    .use(filter(config.filters))
    .use(renderTpl())
    .clean(false)
    .source('.')
    .destination(`${targetPath}/${name}`)
    .build(err => cb(err))
}

/**
 * Get grow.config.js file
 */
function getConfig(tmpPath) {
  const _path = `${tmpPath}/grow.config.json`

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
    
    // bug: 没启动
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

          if (metadata[_v]) delete files[file]
        }
      })
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