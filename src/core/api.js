const download = require('download-git-repo')

/*
 * GitHub operation methods
 */

// download git repo using 
// 'https://www.npmjs.com/package/download-git-repo'
function downloadGitRepo(url, localURL) {
	download(url, localURL, err => {
		if (err) {
			console.log(err)
		}
	})
}




module.exports = {
	downloadGitRepo
}