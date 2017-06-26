const util = require('../utils/util.js')

const API = 'https://api.dribbble.com/v1/'



module.exports = {
	per_page: 100,
	access_token: 'abe70efe6909ee447e5d86ee2fd30d5c45cda4f7be5e7c277865ff98e05b8118',

	getShots(data, cb) {
		console.log(data)
		let param = util.obj2uri(data)

		wx.request({
			url: `${API}/shots/?${param}`,
			success(res) {
				cb(res)
			}
		}) 
	},

	getUi(data, cb) {
		let param = util.obj2uri(data)

		wx.request({
			url: `https://dribbble.com/search?${param}`,
			success(res) {
				cb(res)
			}
		})
	}
}