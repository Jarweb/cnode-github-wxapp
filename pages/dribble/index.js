const api = require('../../utils/dribbble.js')

Page({
	data: {
		isActive: 'ui',
		popShow: false,
		dribbble: [],
		page: 1,
		tab: [
			{
				id: 'ui',
				text: 'ui'
			},
			{
				id: 'recent',
				text: 'recent'
			},
			{
				id: 'views',
				text: 'views'
			},
			{
				id: 'comments',
				text: 'comments'
			},
			{
				id: 'debuts',
				text: 'debuts'
			},
			{
				id: 'teams',
				text: 'teams'
			},
			{
				id: 'rebounds',
				text: 'rebounds'
			},
			{
				id: 'animated',
				text: 'animated'
			},
			{
				id: 'attachments',
				text: 'attachments'
			},
		]
	},

	onLoad() {
		let self = this
		let data = {
			page: this.data.page,
			per_page: api.per_page,
			access_token: api.access_token
		}

		api.getShots(data, function(res) {
			console.log(res)
			self.setData({
				dribbble: self.data.dribbble.concat(res.data)
			})
		})
	},

	tabHandler(e) {
		let self = this
		let query = e.currentTarget.id
		let page = 1
		let dribbble = []
		let data = null 

		this.setData({
			page: page,
			isActive: query,
			dribbble: dribbble
		})

		switch(query) {
			case 'recent':
			case 'views':
				data = {
					sort: query,
					page: page,
					per_page: api.per_page,
					access_token: api.access_token
				}
			break;
			case 'comments':
				data = {
					sort: query,
					page: page,
					timeframe: 'month',
					per_page: api.per_page,
					access_token: api.access_token
				}
			break;
			case 'debuts':
			case 'teams':
			case 'rebounds':
			case 'animated':
			case 'attachments':
				data = {
					list: query,
					sort: 'comments',
					page: page,
					per_page: api.per_page,
					access_token: api.access_token
				}
			break;
		}

		if(query === 'ui') {
			data = {
				q: query,
				page: page,
				per_page: api.per_page,
				access_token: api.access_token
			}

			api.getUi(data, function(res) {
				console.log(res)
			})

		}else{
			api.getShots(data, function(res) {
				console.log(res)
				self.setData({
					dribbble: self.data.dribbble.concat(res.data)
				})
			})
		}

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

	toPreview(e) {
		let current = e.currentTarget.id
		wx.previewImage({
			current,
			urls: [current]
		})
	}
})