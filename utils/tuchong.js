const urls = [
	'https://sue0722.tuchong.com/rest/2/sites/1790610/posts?count=100&page=1&before_timestamp=0',
	'https://seewyn.tuchong.com/rest/2/sites/414452/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/477872/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/55422/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1054687/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1477707/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1034601/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1814729/posts?count=100&page=1&before_timestamp=0',
	'https://wxtx.tuchong.com/rest/2/sites/352764/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1187945/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1550687/posts?count=100&page=1&before_timestamp=0',
	'https://dreamerjane.tuchong.com/rest/2/sites/415558/posts?count=100&page=1&before_timestamp=0',
	'https://tuchong.com/rest/2/sites/1745920/posts?count=100&page=1&before_timestamp=0',
]

module.exports = {
	length: urls.length,
	
	getPic(page, cb) {
		let url = urls[page]

		wx.request({
			url: url,
			success(res) {
				cb(res)
			}
		})
	}
}