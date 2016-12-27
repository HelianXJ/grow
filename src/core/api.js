const download = require('download-git-repo')

/**
 * download git repo using 
 * 'https://www.npmjs.com/package/download-git-repo'
 */
function downloadGitRepo(url, localURL, callback) {
  download(url, localURL, callback)
}

module.exports = {
  downloadGitRepo
}