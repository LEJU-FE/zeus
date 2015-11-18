'use strict';
var util = require('util');
var ejs = require('ejs');
var fs = require('fs');
var model = require('../model/model.js');
var logger = require("../log").helper;
class _controller{
	constructor(){

	}
	render(url, data) {
		var statics = absolutePath + '/test/www/' + hostName + '/statics/html/' + url + '.html';
		if (fs.existsSync(statics)) {
			var str = fs.readFileSync(statics, 'utf8');
			var ret = ejs.render(str, data)
			this.res.writeHead(200, {
				"Content-Type": "text/html"
			});
			this.res.write(ret);
			this.res.end();
		} else {
			this.res.writeHead(404, {
				"Content-Type": "text/html"
			});
			this.res.write("<h1>404 Not Found !</h1>");
			this.res.end();
		}
	}
	info(opts, data,callbacks) {
		var mo = new model.model();
		var _this = this;
		mo.connect(opts,data).then(function(data) {
			var dat = callbacks.call(this, data)
			_this.res.writeHead(200,{"Content-Type":"text/plain",
	            "Access-Control-Allow-Origin":"*",
	            "Access-Control-Allow-Headers":"X-Requested-With",
	            "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS,HTTP",
	            "X-Powered-By":' 3.2.1',
	            "Content-Type": "application/json;charset=utf-8"
	        });
	        _this.res.write(dat);
	        _this.res.end();
		},function(err){
			logger.writeErr(err)
		})
	}
}

exports._create = function(module) {
	util.inherits(module, _controller);
	return function(modname) {
		var obj = new module;
		return obj;
	}
}