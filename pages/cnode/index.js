const api = require('../../utils/cnode.js')
const util = require('../../utils/util.js')

Page({
	data: {
		windowHeight: 0,
		windowWidth: 0,
		isActive: 'all',
		isActiveTab: '全部',
		popShow: false,
		open: true,
		page: 1,
		query: 'all',
		cnode: [],
		tab: [
			{
			  id: 'all',
			  text: '全部'
			},
			{
			  id: 'good',
			  text: '精华'
			},
			{
			  id: 'share',
			  text: '分享'
			},
			{
			  id: 'ask',
			  text: '问答'
			},
			{
			  id: 'job',
			  text: '招聘'
			}
		]
	},

	onShow(e) {
		this.setData({
			windowHeight: wx.getStorageSync('windowHeight'),
			windowWidth: wx.getStorageSync('windowWidth')
		})
	},

	onLoad() {
		let self = this
		let tab = this.data.query
		let page = this.data.page 

		api.getTopics({tab, page}, function(res) {
			self.setData({
				cnode: self.data.cnode.concat(res.data.data.map(function(item) {
					item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at))
					return item
				}))
			})
		})
	},

	tabHandler(e) {
		let self = this 
		let tab = e.currentTarget.id 
		let page = 1
		let isActiveTab

		self.data.tab.forEach(i => {
			i.id === tab && (isActiveTab = i.text)
		})
		console.log(isActiveTab,tab)
		self.setData({
			isActive: tab,
			isActiveTab: isActiveTab,
			query: tab,
			page: page,
			cnode: []
		})

		api.getTopics({tab, page}, function(res) {
			self.setData({
				cnode: self.data.cnode.concat(res.data.data.map(function(item) {
					item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at))
					return item
				}))
			})
		})

		this.setData({
			popShow: !this.data.popShow
		})
	},

	lower(e) {
		// bug
		let self = this
		let tab = self.data.query
		if(!self.data.open) return;

		let page = self.data.page + 1
		self.setData({
			page,
			open: false
		})

		api.getTopics({tab, page}, function(res) {
			self.setData({
				cnode: self.data.cnode.concat(res.data.data.map(function(item) {
					item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at))
					return item
				})),
				open: true
			})

		})
	},

	stageHandle(e) {
		this.setData({
			popShow: !this.data.popShow
		})
	},

	maskHandle(e) {
		this.setData({
			popShow: !this.data.popShow
		})
	},

	toDetail(e) {
		let id = e.currentTarget.id 

		wx.navigateTo({
			url: '../cnodeDetail/index?id=' + id
		})
	}
})