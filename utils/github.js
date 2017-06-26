const API = 'https://api.github.com/search/repositories?sort=stars&order=desc&q='

module.exports = {
	getRespos(query, cb) {

		wx.request({
			url: `${API}${query}`,
			success(res) {
				cb(res)
			}
		})
	}
}