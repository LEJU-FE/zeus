var t = function(){
	this.test=function(page,getdata){
		var data = {supplies:['1','2','3']},
			_this = this;
		_this.render(page, data);
	}
	this.a=function(page,getdata){
		var data = {supplies:['4','5','6']},
			_this = this;
		_this.render(page, data);
	}
}
exports._create = controller._create(t);