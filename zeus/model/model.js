var http = require('http');
var requests = require('request');
var Q = require('q')
var _model = function() {

}
_model.prototype = {
	connect: function(opts,data) {
		var req,deferred,data = data||'';
		deferred = Q.defer();
		req = http.request(opts, function(res) {
			res.on('data', function (data) {
				deferred.resolve(data)
			});
		})
		req.write(data)
		req.on('error', function(e) {
				deferred.reject(e.message)
			})
		req.end()
		return deferred.promise;
	}
}
exports.model = _model;