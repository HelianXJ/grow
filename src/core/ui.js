const ora = require('ora')

/**
 * Spinner
 */

exports.download = ora({
	text: 'downloading template'
})

exports.compile = ora({
	text: 'compiling template'
})
