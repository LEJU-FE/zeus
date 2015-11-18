var t = function() {
	this.test = function(url, getdata) {
		var _this = this;
		var opt = {
			host: '127.0.0.1',
			port: 1337,
			method: 'post',
			path: '/api/im/search',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': getdata.length
			}

		}
		_this.info(opt,getdata,function(o){
			var da = o.toString("utf-8");
			return da	
		})
	}
}
exports._create = controller._create(t);