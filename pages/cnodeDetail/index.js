const api = require('../../utils/cnode.js')
const util = require('../../utils/util.js')
const wxp = require('../../utils/wxParse/wxParse.js')

Page({
	data: {
		detail: {}
	},

	onLoad(opt) {
		this.fetchData(opt.id)
	},

	fetchData(id) {
		let self = this

		api.getTopicById(id,{mdrender: false}, function(res) {
			
			res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at))
			res.data.data.replies = res.data.data.replies.map(function(item){
				item.create_at = util.getDateDiff(new Date(item.create_at))
				return item
			})

			self.setData({
				detail: res.data.data
			})

			var content = res.data.data.content 
			wxp.wxParse('content','md',content,self,5)
		})
	}
})