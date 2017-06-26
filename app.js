App({
	globalData: {
		userInfo: null
	},

	onLaunch() {
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		wx.getSystemInfo({
			success(res) {
				wx.setStorageSync('windowHeight', res.windowHeight)
				wx.setStorageSync('windowWidth', res.windowWidth)
			}
		})
	},

	onShow(e) {

	},

	getUserInfo(cb) {
		var self = this 
		if(this.globalData.userInfo) {
			typeof cb == 'function' && cb(this.golbalData.userInfo)
		}else{
			wx.login({
				success() {
					wx.getUserInfo({
						success(res) {
							self.globalData.userInfo = res.userInfo
							typeof cb == 'function' && cb(self.globalData.userInfo)
						}
					})
				}
			})
		}
	},

})