const fs = require('fs')
const minimatch = require('minimatch')
const Metalsmith = require('metalsmith')
const render = require('consolidate').handlebars.render
const { error } = require('./utils/logger.js')
const { 
  getConfig, 
  askUser, 
  detectReadme, 
  isReadme 
} = require('./utils/utils.js')

/**
 * Constances
 */

const cfgFileName = 'grow.config.json'

/**
 * Generate the final project using template and user input data
 *
 * @param  {Boolean}  inDir      Whether to render files in current folder
 * @param  {String}   name       The name of the project
 * @param  {String}   tmpPath    Temp folder holding the downloaded template
 * @param  {String}   targetPath Target path for the generated project
 * @param  {Function} cb         Callback called when finished, err for parameter
 */
function compile(inDir, name, tmpPath, targetPath, cb) {
  // read config file
  const config = getConfig(tmpPath, cfgFileName)

  // use user input name ( repo name ) as the default name
  if (config.ask.hasOwnProperty('name')) {
    if (!config.ask.name.default) {
      config.ask.name.default = name
    }
  }

  // make destination dir name
  let dest = `${targetPath}/${name}`
  let isReadmeExist = false
  if (inDir) {
    dest = `${targetPath}`
    isReadmeExist = detectReadme(dest)
  }

  // compile
  Metalsmith(tmpPath)
    .use(ask(config.ask))
    .use(filter(config.filters))
    .use(cleanFiles([cfgFileName, '.gitignore']))
    .use(handleReadme(isReadmeExist))
    .use(renderTpl())
    .clean(false)
    .source('.')
    .destination(dest)
    .build(err => cb(err))
}


/**
 * Ask user questions using inquirer.js - [metalsmith plugin]
 */

function ask(askData) {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()
    
    askUser(askData).then(answer => {
      Object.keys(answer).forEach(key => {
        metadata[key] = answer[key]
      })
      cb()
    })
  }
}

/**
 * Filter file - [metalsmith plugin]
 */

function filter(filters) {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()

    if (filters) {
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
    }

    cb()
  }
}

/**
 * Clean given files - [metalsmith plugin]
 */

function cleanFiles(filenames) {
  return function (files, metalsmith, cb) {
    let metadata = metalsmith.metadata()

    Object.keys(files).forEach(file => {
      filenames.forEach(filename => {
        if (minimatch(file, filename, { dot: true })) {
          delete files[file]
        }
      })
    })
    cb()
  }
}

/**
 * Preserve readme.md if there's one in the current folder
 */

function handleReadme(isReadmeExist) {
  return function (files, metalsmith, cb) {
    if (isReadmeExist) {
      let metadata = metalsmith.metadata()

      Object.keys(files).forEach(file => {
        if (isReadme(file)) {
          delete files[file]
        }
      })
    }

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
