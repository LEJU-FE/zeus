global.Http = require('http');
global.controller = require('./controller/controller.js');
global.absolutePath = '/Users/xtx/Desktop/workspace/zeus';
var Url=require('url');
var fs = require('fs');
var Path = require('path');
var querystring = require("querystring");
var logger = require("./log").helper;
var args = process.argv.slice(2);
var port = (args[0] && /^\d+$/.test(args[0])) ? parseInt(args[0]) : 3000;
var Webser = function(req,res){
	var reqUrl = req.url; 
	var pathName = Url.parse(reqUrl).pathname;
	var suffix = pathName.match(/\.([^\/|\.]*$)/);
	var type,suffixType;
	global.hostName = req.headers['x-forwarded-host']
	if (suffix) {
		switch(suffix[1]){
			case "html":
			case "htm":
				suffixType = "html"
				type = "text/html;charset=UTF-8";break;
			case "js":
				suffixType = "js"
				type = "application/javascript;charset=UTF-8";break;
			case "css":
				suffixType = "css"
				type = "text/css;charset=UTF-8";break;
			case "txt":
				suffixType = "html"
				type = "text/plain;charset=UTF-8";break;
			case "manifest":
				suffixType = "xml"
				type = "text/cache-manifest;charset=UTF-8";break;
			case "jpg":
				suffixType = "img"
				type = "image/jpg;";break;
			case "png":
				suffixType = "img"
				type = "image/png;";break;
			case "gif":
				suffixType = "img"
				type = "image/gif;";break;
			default:
				type = "application/octet-stream";break;
		}
		var statics = absolutePath+'/test/www/'+hostName+'/statics/' + suffixType + pathName.replace(/\/?.+\//ig,'/');
		if (fs.existsSync(statics)) {
			logger.writeInfo('guest request:'+req.headers['x-forwarded-for']||req.connection.remoteAddress+' , '+statics+' , '+req.method)
			fs.readFile(statics,function(err,content){
				if(err){
					res.writeHead(404,{
						"Content-Type":"text/plain;charset=UTF-8"
					});
					res.write(err.message);
					res.end();
				}
				else{
					res.writeHead(200,{"Content-Type":type});
					res.write(content);
					res.end();
				}
			});
		}else{
			res.writeHead(404, {"Content-Type": "text/html"});
			res.write("<h1>404 Not Found !</h1>");
			res.end();
		}
		return true
	}
	var pn = pathName.replace(/^\/|\/$/,'').split('/');
	var controllerPath = pn[0];
	var route = pn[1];
	if(req.method == 'GET'){
		var getdata=Url.parse(reqUrl,true).query||'';
		mainRander(getdata)
	}else if(req.method == 'POST'){
		var postdata = '';
		req.addListener('data',function(postchunk){
	        postdata += postchunk;
	    })
	    req.addListener('end',function(){
	        var params = querystring.parse(postdata);
	        mainRander(postdata)
	    })
	}else{
		mainRander(getdata)
	}
	function mainRander(getdata){
		if(controllerPath=='ajax'){
			var re = require(absolutePath+'/test/www/'+hostName+'/controller/'+controllerPath+'.js');
			var newObj = re._create();
			newObj.res = res;
			newObj.req = req;
			logger.writeDebug('the ajax path:'+route)
			var data = newObj[route](route,JSON.stringify(getdata));
			return false;
		}
		if(controllerPath&&route){
			var re = require(absolutePath+'/test/www/'+hostName+'/controller/'+controllerPath+'.js');
			var newObj = re._create();
			newObj.res = res;
			newObj.req = req;
			newObj[route](route,getdata)
			logger.writeDebug('the page path:'+controllerPath)
		}else{
			var re = require(absolutePath+'/test/www/'+hostName+'/controller/index.js')
			var newObj = re._create();
			newObj.res = res;
			newObj.req = req;
			route=controllerPath||'index'
			newObj[route](route,getdata)
			logger.writeDebug('the index page path:'+hostName)
		}
	}
}
var server = Http.createServer(Webser)
server.on("error", function(error) { 
	console.log(error);
}); 
server.listen(port,function(){
	console.log('fuck node'); 
});
