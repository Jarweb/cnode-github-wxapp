const util = require('../utils/util.js')

const API = 'https://cnodejs.org/api/v1'

module.exports = {
	getTopics(data, cb) {
		console.log(data)
		let param = util.obj2uri(data)
		//tab=%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D&page=1
		wx.request({
			url: `${API}/topics?${param}`,
			success(res) {
				cb(res)
			}
		})
	},

	getTopicById(id, data, cb) {
		let param = util.obj2uri(data)

		wx.request({
			url: `${API}/topic/${id}?${param}`,
			success(res) {
				cb(res)
			}
		})
	}
}