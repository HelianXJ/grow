const download = require('download-git-repo')
const request = require('request')
const logger = require('./logger.js')

/**
 * download git repo using 
 * 'https://www.npmjs.com/package/download-git-repo'
 */
function downloadGitRepo(url, localURL, callback) {
  download(url, localURL, callback)
}

/**
 * Fetch repos on github using your user name
 */
function fetchRepos(username, cb) {
  request({
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'grow template cli'
    }
  }, (err, res, body) => cb(err, body))
}

module.exports = {
  downloadGitRepo,
  fetchRepos
}