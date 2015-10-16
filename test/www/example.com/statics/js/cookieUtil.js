// utility function to retrieve an expiration data in proper format;
    function getExpDate(days, hours, minutes)
    {
        var expDate = new Date();
        if(typeof(days) == "number" && typeof(hours) == "number" && typeof(hours) == "number")
        {
        	var time = expDate.getTime() + days*24*60*60*1000;
        	time += hours*60*60*1000;
        	time += minutes*60*1000;
        	expDate.setTime(time);
            return expDate.toGMTString();
        }
    }

    //utility function called by getCookie()
    function getCookieVal(offset)
    {
        var endstr = document.cookie.indexOf(";", offset);
        if(endstr == -1)
        {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    }

    // primary function to retrieve cookie by name
    function getCookie(name)
    {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while(i < clen)
        {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
            {
                return getCookieVal(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if(i == 0) break;
        }
        return;
    }

    function setCookie(name, value)
    {
    	var expires = getExpDate(1,0,0);
	    setCookie2(name, value, expires, "/", "", "");
    }
    // store cookie value with optional details as needed
    function setCookie2(name, value, expires, path, domain, secure)
    {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    }

    function deleteCookie(name){
    	deleteCookie2(name,"/","");
    }
    // remove the cookie by setting ancient expiration date
    function deleteCookie2(name,path,domain) 
    {
        if(getCookie(name))
        {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }