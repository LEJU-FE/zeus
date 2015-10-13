var util = require('util');
var ejs = require('ejs');
var fs = require('fs');
var _controller=function(){

}
_controller.prototype={
	constructor:_controller,
	render:function(url,data){
		var statics = absolutePath+'/test/www/'+hostName+'/statics/html/' +url +'.html';
		if (fs.existsSync(statics)) {
			var str = fs.readFileSync(statics, 'utf8');
			var ret = ejs.render(str,data)
			this.res.writeHead(200, {"Content-Type": "text/html" });
			this.res.write(ret);
			this.res.end();
		}else{
			this.res.writeHead(404, {"Content-Type": "text/html"});
			this.res.write("<h1>404 Not Found !</h1>");
			this.res.end();
		}
	}
}
exports._create = function(module){
	util.inherits(module, _controller);
	return function(modname){
		var obj = new module;
		return obj;
	}	
}