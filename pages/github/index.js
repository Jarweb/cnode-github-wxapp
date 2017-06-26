const api = require('../../utils/github.js')

Page({
	data: {
		windowHeight: 0,
		windowWidth: 0,
		popShow: false,
		isActive: 'vue',
		query: 'vue',
		github: [],
		diy: [],
		tab: [
			{
				id: 'vue',
				text: 'vue'
			},
			{
				id: 'weex',
				text: 'weex'
			},
			{
				id: 'react',
				text: 'react'
			},
			{
				id: 'react-native',
				text: 'rn'
			},
			{
				id: 'angular',
				text: 'angular'
			},
			{
				id: 'ionic',
				text: 'ionic'
			},
			{
				id: 'javascript',
				text: 'js'
			},
			{
				id: 'css',
				text: 'css'
			},
			{
				id: 'html',
				text: 'html'
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
		let query = this.data.query

		this.setData({
			diy: wx.getStorageSync('diy') || []
		})

		api.getRespos(query, function(res) {
			self.setData({
				github: res.data.items
			})
		})
	},

	tabHandler(e) {
		let self = this
		let query = e.currentTarget.id
		 
		this.setData({
			isActive: query
		})

		api.getRespos(query, function(res) {
			self.setData({
				github: res.data.items
			})
		})

		this.setData({
			popShow: !this.data.popShow
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

	searchHandle(e){
		let val = e.detail.value.trim()
		this.queueList(val)
	},

	queueList(data){
		let self = this
		if(self.data.diy.length > 8){
			self.data.diy.shift()
		}

		console.log(self.data.diy)
		self.data.diy.push(data)

		self.setData({
			diy: self.data.diy
		})

		wx.setStorageSync('diy', self.data.diy)
	}
})