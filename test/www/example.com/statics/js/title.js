// JavaScript Document
function checkUser(){
	if(getCookie('user')==null){
		alert('您尚未登录!');
		window.location.href='login.html';
		}else{
			return true;
			}
	}
function getUser(){
var a=getCookie('user');
var b=document.getElementById('wel');
if(a==null){
	b.innerHTML+='游客';
	}else{
	b.innerHTML+=a;
	/*var span=document.createElement('span');
	span.innerHTML='退出登录';
	span.setAttribute('class','span1');
	b.appendChild(span);*/
	}
}
/*(function($){
	var a=$('.span1').eq(0);
	a.on('click',function(){
	deleteCookie('user');
	alert(1);
	});
	})(jQuery);*/
(function($){
	var a=$('.header ul li');
	var b=a.eq(3);
	b.on('click',function(){
		if(checkUser()==true){
			deleteCookie('user');
			window.location.href='index.html';
			}
	});
	var c=a.eq(1);
	c.on('click',function(){
		if(getCookie('user')!=null){
			alert('您已经登录');
			}else{
				window.location.href='register.html';
				}
		})
	})(jQuery);
window.onbeforeonload=getUser();