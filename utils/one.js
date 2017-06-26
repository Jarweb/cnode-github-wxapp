const API = 'http://v3.wufazhuce.com:8000/api'

module.exports = {
	getOne(tag, month, cb) {
		wx.request({
			url: `${API}/${tag}/bymonth/${month}`,
			success(res) {
				cb(res)
			}
		})
	}
}