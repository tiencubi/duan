/*  
 * Copyright 2009 by lyhuuloi, http://lyhuuloi.com
 * ---------------------------------------------------------------------------
 *
 * The Javascript library of CRM Project
 * Created date: 16/06/2009, 10:57:12 AM
 *
 */

var site_var_cookieid = "";
var site_var_cookie_domain = "";
var site_var_cookie_path   = "/";
var site_login_click = 0;
var site_login_status = 1;
var data_request_sent = 0;
var data_request_received = 0;
var startday = new Date();
var clockStart = startday.getTime(); 
var site_tips = ""; 
var is_ie = document.all?true:false;

function initStopwatch()   
{   
	var myTime = new Date();   
	var timeNow = myTime.getTime();    
	var timeDiff = timeNow - clockStart;   
	this.diffSecs = timeDiff/1000;   
	return(this.diffSecs);
}

if ( window.ActiveXObject )
{
	var is_ie = 1;
}

function logout()
{
	//ht = document.getElementsByTagName("html");
	//ht[0].style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)";
	
	if ( confirm("Ban co chac la muon thoat ra ?") )
	{
		logout_request();
		
		return false;
	}
	else
	{
		//ht[0].style.filter = "";
		return false;
	}
}

var on_mouse = 1;

function form_checkall(name)
{
	if ( on_mouse == 0 )
	{
		for ( var i = 0; i < document.forms[name].elements.length; i++)
		{
			if ( document.forms[name].all.checked == true )
			{
				document.forms[name].elements[i].checked = true;
			}
			else
			{
				document.forms[name].elements[i].checked = false;
			}
		}
	}
	else
	{
		if ( document.forms[name].all.checked == false )
		{
			document.forms[name].all.checked = "checked";
		}
		else
		{
			document.forms[name].all.checked = false;
		}

		for ( var i = 0; i < document.forms[name].elements.length; i++)
		{
			if ( document.forms[name].all.checked == true )
			{
				document.forms[name].elements[i].checked = true;
			}
			else
			{
				document.forms[name].elements[i].checked = false;
			}
		}
	}
}

function my_getcookie( name )
{
	cname = site_var_cookieid + name + '=';
	cpos  = document.cookie.indexOf( cname );
	
	if ( cpos != -1 )
	{
		cstart = cpos + cname.length;
		cend   = document.cookie.indexOf(";", cstart);
		
		if (cend == -1)
		{
			cend = document.cookie.length;
		}
		
		return unescape( document.cookie.substring(cstart, cend) );
	}
	
	return null;
}


function my_setcookie( name, value, sticky )
{
	expire = "";
	domain = "";
	path   = "/";
	
	if ( sticky )
	{
		expire = "; expires=Wed, 1 Jan 2020 00:00:00 GMT";
	}
	
	if ( site_var_cookie_domain != "" )
	{
		domain = '; domain=' + site_var_cookie_domain;
	}
	
	if ( site_var_cookie_path != "" )
	{
		path = site_var_cookie_path;
	}
	
	document.cookie = site_var_cookieid + name + "=" + value + "; path=" + path + expire + domain + ';';
}

function page_loading_html( text )
{
	text = "<DIV style='width: 100%; padding-top: 7px; padding-bottom: 7px;' align='center'> &nbsp; " + text + " </div>";
	
	return text;
}

function page_loading(type)
{
	if ( type == 1 )
	{
		document.getElementById( this.clicked ).innerHTML = page_loading_html("<img align='absmiddle' src='" + site_root_domain + "/templates/images/warning.png'> <font size='2' face='verdana' color='red'>K&#7871;t n&#7889;i b&#7883; l&#7895;i....</font>");
	}
	else if ( type == 2 )
	{
		document.getElementById( this.clicked ).innerHTML = "";
	}
	else
	{
		document.getElementById( this.clicked ).innerHTML = page_loading_html("<font size='2' face='verdana'><img align='absmiddle' src='" + site_root_domain + "/templates/images/loading_layer.gif'>");
	}
}

function data_request(request, url, type, form_id, no_status)
{
	this.clicked = request;
	
	data_request_sent++;
	update_status(0);
	
	this.no_status = no_status;
	
	if ( no_status == 1 )
	{
		no_status = 1;
	}
	else
	{
		no_status = 0;
	}
	
	if ( ! type )
	{
		type = "GET";
	}
	else
	{
		type = "POST";
	}
	
	var fields_data = "";
	var lhl_data_got = "";

	if ( form_id )
	{
		if ( type == "GET" )
		{
			var fields_data = "?";
		}
		else if ( type == "POST" )
		{
			var fields_data = "";
		}

		var frm = document.forms[form_id];
		var numberElements = frm.elements.length;
				
		for( var i = 0; i < numberElements; i++ )
		{
			if( i < numberElements-1 )
			{
				if ( frm.elements[i].type == "select-one" )
				{
					fields_data += frm.elements[i].name+"="+frm.elements[i].value+"&";
				}
				else if ( frm.elements[i].type == "select-multiple" )
				{
					art_name = frm.elements[i].name;
					
					selmul = frm.elements[i];
	
					var seldt = new Array();
					var selcnt = 0;
					
					for ( var i = 0; i < selmul.length; i++ )
					{
						if ( selmul.options[i].selected == true )
						{
							seldt[selcnt] = selmul.options[i].value;
							selcnt++;
						}
					}
										
					fields_data += art_name+"="+seldt+"&";
				}
				else if ( ( frm.elements[i].type == "radio" ) || ( frm.elements[i].type == "checkbox" ))
				{
					if (frm.elements[i].checked)
					{
						fields_data += frm.elements[i].name+"="+frm.elements[i].value+"&";
					}
				}
				else
				{
					fields_data += frm.elements[i].name+"="+frm.elements[i].value+"&";
				}
			}
			else
			{
				if (frm.elements[i].type == "radio")
				{					
					if (frm.elements[i].checked)
					{
						fields_data += frm.elements[i].name+"="+frm.elements[i].value;
					}
				}
				else
				{
					fields_data += frm.elements[i].name+"="+frm.elements[i].value;
				}
			}
		}
		
	}

	http_request = false;

	//this.lhl_id_packet_send_to = request;
	
	if ( request )
	{
		if ( no_status != 1 )
		{
			page_loading();
		}
	}
	
	if (window.XMLHttpRequest) // Mozilla, Safari,...
	{
		http_request = new XMLHttpRequest();
		
		if (http_request.overrideMimeType)
		{
			http_request.overrideMimeType('text/xml');
		}
	
	}
	else if (window.ActiveXObject) // IE
	{
		try
		{
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
			
			}
		}
	}

	if ( ! http_request )
	{
		if ( request )
		{
			page_loading(1);
		}

		return false;
	}
		
	http_request.onreadystatechange = function(){if (http_request.readyState == 4)
	{
		if (http_request.status == 200)
		{
			data_request_received++;
			update_status(1);
				
			if ( request )
			{
				if ( no_status != 1 )
				{
					page_loading(2);
				}
			
				data_request_time = 1;

				document.getElementById( request ).innerHTML = http_request.responseText;
			}
		}
		else
		{
			if ( request )
			{
				if ( no_status != 1 )
				{
					page_loading(1);
				}
			}
		}
	}};

	if ( type == "POST" )
	{
		http_request.open('POST', url, true);
		http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		http_request.setRequestHeader("Content-length", fields_data.length);
		http_request.setRequestHeader("Connection", "close");
		http_request.send(fields_data);
	}
	else if ( type == "GET" )
	{
		http_request.open('GET', url + fields_data, true);
		http_request.send(null);
	}
	
}

function update_status(type)
{
	
	if ( document.getElementById( 'SITE_request_sent' ) )
	{
		if ( type == 1 )
		{
			status_received = data_request_received;
	
			document.getElementById( 'SITE_request_received' ).innerHTML = status_received;
		}
		else
		{
			status_sent = data_request_sent;
	
			document.getElementById( 'SITE_request_sent' ).innerHTML = status_sent;
		}
	}
}

var IE = document.all?true:false
	
if ( ! IE )
{
	document.captureEvents( Event.KEYPRESS );
}

document.onmousemove = getMouseXY;

function ietruebody()
{
	return (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
}

var tempX = 0;
var tempY = 0;

function getMouseXY(e)
{
	if ( IE )
	{
		tempX = event.clientX + ietruebody().scrollLeft;
		tempY = event.clientY + ietruebody().scrollTop;
	}
	else
	{
	    tempX = e.pageX;
	    tempY = e.pageY;
	}
	
	if ( tempX < 0 )
	{
		tempX = 0
	}
	
	if ( tempY < 0 )
	{
		tempY = 0
	}
	
	return true;
}

function href_close()
{
	base_url = window.location.href;
	base_url = base_url.split("#");
	window.location.href = base_url[0] + "#";
}

function href_click( data )
{
	//base_url = window.location.href;
	//base_url = base_url.split("#");
	//window.location.href = base_url[0] + "#" + data;
	
	window.location.href = data;
}

function rating_over( num )
{
	var numelse = 10 - num;
		
	for ( i = 1; i <= num; i ++ )
	{
		document.getElementById( "star_" + i ).style.opacity = 1;
		document.getElementById( "star_" + i ).style.filter = "alpha(opacity=100)";
	}
	
	for ( i = num+1; i <= numelse; i ++ )
	{
		document.getElementById( "star_" + i ).style.opacity = 0.4;
		document.getElementById( "star_" + i ).style.filter = "alpha(opacity=60)";
	}
	
	document.getElementById("rating_star").innerHTML = num;
}

function rating_out()
{
	for ( i = 1; i <= 10; i ++ )
	{
		document.getElementById( "star_" + i ).style.opacity = 0.4;
		document.getElementById( "star_" + i ).style.filter = "alpha(opacity=60)";
	}
}

function rating_click( target_to, target_id )
{	
	var star_select = document.getElementById("rating_star").innerHTML;
	
	if ( star_select > 0 )
	{
		data_request( target_id, target_to + star_select + "/", "GET", "", 0 );
	
		return false;
	}
}

function add_favourite( name, URL )
{
	if (window.sidebar)
	{
		window.sidebar.addPanel(name, url,"");
	}
	else if( window.external )
	{
		window.external.AddFavorite( url, name);
	}
	else if  (window.opera && window.print)
	{
		return true;
	}
}

var current_field = "";
var current_opacity = 0;

function close_warning()
{
	if ( ! current_field )
	{
		return false;	
	}

	var object = document.getElementById(current_field);

	if ( document.getElementById(object.id+"_head_alert") )
	{
		//var d = object.offsetParent;
		var d = object.parentNode;
		
		if ( d ) // Set this condition to fix the error appeared when the user set the object as invisible
		{
			var olddiv = document.getElementById(object.id+"_head_alert");
			d.removeChild(olddiv);
		}
	}
	else
	{
		//var d = object.offsetParent;
		var d = object.offsetParent;
		
		if ( d ) // Set this condition to fix the error appeared when the user set the object as invisible
		{
			var olddiv = document.getElementById(object.id+"_alert");
			d.removeChild(olddiv);
		}
	}
			
	current_field = "";
	current_opacity = 0;
}

function open_opacity()
{
	if ( ! current_field )
	{
		return false;	
	}
	
	var object = document.getElementById(current_field);
	
	if ( current_opacity <= 10 )
	{
		document.getElementById(""+object.id+"_sub"+"").style.opacity = current_opacity * 0.1;
		document.getElementById(""+object.id+"_sub"+"").style.filter = "alpha(opacity="+current_opacity * 10+")";
		
		current_opacity++;
		
		setTimeout("open_opacity()", 40);
	}
}

function check_element( object )
{
	if ( ! object )
	{
		return false;
	}

	if ( object.type == "select-one" )
	{
		var option_value = object.options[object.selectedIndex].value;
		option_value = option_value.toLowerCase();
		
		if ( option_value == "" || option_value == "none" )
		{
			return false;
		}
	}
	else if ( object.type == "textarea" )
	{
		return true;
	}
	else if ( ! object.value )
	{
		return false;	
	}

	return true;
}

function open_warning( element_id, display_type )
{
	if ( ! document.getElementById(element_id) )
	{
		return true;	
	}
	
	var object = document.getElementById(element_id);

	close_warning();
	
	if ( ! object )
	{
		return true;
	}

	if ( (check_element(object) == false && object.getAttribute('emsg')) || (object.value && object.getAttribute('etype')) )
	{
		// Setup message
		if( check_element(object) == false && object.getAttribute('emsg') )
		{
			var emsg = object.getAttribute('emsg');
		}
		else if ( object.getAttribute('etype') == "email" && check_email(object.value) == false )
		{
			var emsg = lang_invalid_email;
		}
		else if ( object.getAttribute('etype') == "phone" && check_phone(object.value) == false )
		{
			var emsg = lang_invalid_phone;
		}
		else if ( object.getAttribute('etype') == "number" && check_number(object.value) == false )
		{
			var emsg = lang_invalid_number;
		}
		else if ( object.getAttribute('etype') == "date" && check_date(object.value) == false )
		{
			var emsg = lang_invalid_date;
		}
		else if ( object.getAttribute('etype') == "ip" && check_ip_address(object.value) == false )
		{
			var emsg = lang_invalid_ip_address;
		}
		else if ( object.getAttribute('etype') == "domain" && check_domain(object.value) != true )
		{
			var emsg = check_domain(object.value);
		}
		else if ( object.getAttribute('etype') == "subdomain" && check_subdomain(object.value) != true )
		{
			var emsg = lang_invalid_subdomain;
		}
		else if ( object.getAttribute('etype') == "username" && check_username(object.value) != true )
		{
			var emsg = lang_invalid_username;
		}
		else if ( object.getAttribute('etype') == "http" && check_http(object.value) != true )
		{
			var emsg = lang_invalid_http;
		}
		else if ( object.getAttribute('maxvalue') && parseInt(object.value) > parseInt(object.getAttribute('maxvalue')) )
		{
			var emsg = lang_invalid_maxvalue.replace("%number%", number_format(parseInt(object.getAttribute('maxvalue'))));
		}
		else if ( object.getAttribute('minvalue') && parseInt(object.value) < parseInt(object.getAttribute('minvalue')) )
		{
			var emsg = lang_invalid_minvalue.replace("%number%", number_format(parseInt(object.getAttribute('minvalue'))));
		}
		else
		{
			return true;
		}

		// Get the co-ordinate of element
		var x = object.offsetLeft;
		var y = 0;
		
		// Check existing the element
		if ( ! document.getElementById(object.id+"_alert") )
		{
			/*
			// <ul><li>
			if ( object.offsetParent.innerHTML.length > 1000 )
			{
				x = object.offsetLeft + object.clientWidth;
				y = object.offsetTop - 4;
				
				object.parentNode.innerHTML = "<div id='"+object.id+"_alert"+"' style='position: absolute; height: 0px; padding-left: "+x+"px; padding-top: "+y+"px;'></div>" + object.parentNode.innerHTML;
			}
			// <table><tr><td>
			else
			{*/
				x = x == 0 ? object.clientWidth : x;
				
				object.parentNode.innerHTML = "<div id='"+object.id+"_head_alert"+"' style='position: absolute; padding-left: "+x+"px; width: 10px;'><div id='"+object.id+"_alert"+"' style='position: absoulute;'></div></div>" + object.parentNode.innerHTML;
			//}
		}

		// Fix focus() by reload the element, very important with lyhuuloi, haha :))
		object = document.getElementById(element_id);

		var alert_table = document.getElementById(object.id+"_alert");

		// Set queued name
		current_field = object.name;
				
		// Display the error board
		if ( display_type == "table" )
		{
			document.getElementById(object.id+"_alert").style.paddingLeft = (x+object.offsetWidth)+"px";
		}

		alert_table.innerHTML = "<div id='"+object.id+"_sub"+"' style='opacity:0; filter:alpha(opacity=0);'> <img style='position: absolute; z-index: 1; padding-top: 1px;' src='"+site_img_url+"/icons/arrow_alertbox.gif'> <div onclick='javascript:close_warning();' style='position: absolute; z-index: 0; cursor: pointer; border: solid #F2DDDD 1px; margin-left: 5px;'><div style='border: solid #992A2A 1px; background: #F2DDDD; width: 250px; padding: 4px;'>"+emsg+"</div></div></div>";

		setTimeout("open_opacity()", 1);
		
		object.focus();

		return false;
	}
}

function check_ip_address( str )
{
	//var filter = /^(([1-9][0-9]{0,2})|0)\.(([1-9][0-9]{0,2})|0)\.(([1-9][0-9]{0,2})|0)\.(([1-9][0-9]{0,2})|0)$/;
	
	//if ( ! filter.test( str ) )
	//{
	//	return false
	//}
	//else
	//{
	//	return true;	
	//}
	
	var ipaddr = str;
	
    ipaddr = ipaddr.replace( /\s/g, "") //remove spaces for checking
    var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; //regex. check for digits and in all 4 quadrants of the IP

    if (re.test(ipaddr)) {
        //split into units with dots "."
        var parts = ipaddr.split(".");
        //if the first unit/quadrant of the IP is zero
        if (parseInt(parseFloat(parts[0])) == 0) {
            return false;
        }
        //if the fourth unit/quadrant of the IP is zero
        if (parseInt(parseFloat(parts[3])) == 0) {
            return false;
        }
        //if any part is greater than 255
        for (var i=0; i<parts.length; i++) {
            if (parseInt(parseFloat(parts[i])) > 255){
                return false;
            }
        }
        return true;
    } else {
        return false;
    }

}

function check_domain(nname)
{
	nname = trim(nname.toLowerCase());
	
	var arr = new Array(
	'.com','.net','.org','.biz','.coop','.info','.museum','.name',
	'.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
	'.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
	'.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
	'.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
	'.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
	'.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
	'.ec','.ee','.eg','.eh','.er','.es','.et','.fi','.fj','.fk','.fm',
	'.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
	'.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
	'.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
	'.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
	'.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
	'.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
	'.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
	'.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
	'.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
	'.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
	'.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
	'.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
	'.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
	'.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
	'.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
	'.wf','.ye','.yt','.yu','.za','.zm','.zw',
	'.asia','.me','.tel','.eu','.mobi','.xxx','.moda');
	
	var mai = nname;
	var val = true;
	
	var dot = mai.lastIndexOf(".");
	var dname = mai.substring(0,dot);
	var ext = mai.substring(dot,mai.length);
	
	if(dot>2 && dot<57)
	{
		for(var i=0; i<arr.length; i++)
		{
		  if(ext == arr[i])
		  {
			val = true;
			break;
		  }	
		  else
		  {
			val = false;
		  }
		}
		if(val == false)
		{
			 return lang_invalid_domain_ext;
		}
		else
		{
			for(var j=0; j<dname.length; j++)
			{
			  	var dh = dname.charAt(j);
			  	var hh = dh.charCodeAt(0);
			  	if((hh > 47 && hh<59) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==45 || hh==46)
			  	{
				 	if((j==0 || j==dname.length-1) && hh == 45)	
				 	{
						return lang_invalid_domain_start;
				 	}
			 	}
				else
				{
					return lang_invalid_domain_char;
			 	}
			}
		}
	}
	else
	{
		return lang_invalid_domain_length;
	}	
	
	return true;
}

function check_subdomain(str)
{
	//var subdomainPattern = /[a-zA-Z0-9-]$/;  
	//return subdomainPattern.test(str);
	if ( str.match(/[^\w\u00C0-\u1EF9-]/g) )
	{
		return false;	
	}
	else
	{
		return true;	
	}
}


function check_email( str )
{
	var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
	return emailPattern.test(str);
}

function check_number(str)
{
    if ( isNaN(str) == true )
	{
        return false;
    }
	
    return true;
}

function check_http(nname)
{
	if ( nname.substring(0,4).toLowerCase() != "http" )
	{
		return false;
	}
	
	return true;
}

function check_phone(str)
{
    var error = "";
    var stripped = str.replace(/[\(\)\.\-\ ]/g, '');   

	if ( str == "" )
	{
        return false;	
    }
	else if ( str.length < 8 )
	{
		return false;	
	}
	else if ( isNaN(stripped) == true )
	{
        return false;
    }
	else if ( stripped.length > 12 && stripped.substr(0,1) != "+" )
	{
        return false;
    }
	else if ( stripped.length > 13 && stripped.substr(0,1) == "+" )
	{
		return false;
	}
	
    return true;
}

function check_date(str)
{
	var d = new Date();

	str = str.split("\/");
	
	if ( str.length < 3 || str[0] > 31 || str[1] > 12 )
	{
		return false;
	}
}

function check_username(name)
{
	if ( name.match(/[^\w\u00C0-\u1EF9 -.]/g) )
	{
		return false;	
	}
	else
	{
		var chaos = new Array ("'","~","@","#","$","%","^","&","*",";","/","\\","|");
		var sum = chaos.length;
		for (var i in chaos) 
		{
			if (!Array.prototype[i]) 
			{
				sum += value.lastIndexOf(chaos[i])
			}
		}
		if (sum)
		{
			alert("Một số phần không nên có những ký tự đặc biệt như kiểu này: @ # $ % ^ * ~ ");
			
			return false;
		}
		return true;
	}
}

function check_form( form_id, type )
{
	var object;
	
	var frm = document.forms[form_id];
	var numberElements = frm.elements.length;

	for( var i = 0; i < numberElements; i++ )
	{
		object = frm.elements[i];

		if ( open_warning(object.name, type) == false )
		{
			return false;
		}
	}
}

var form_select_data = "";

function rebuild_form( form_id, type, marked )
{
	var frm = document.forms[form_id];
	
	if ( ! frm )
	{
		return false;	
	}
	
	var numberElements = frm.elements.length+5;
	var sympol = "(*)";
	var is_emsg = 0;

	for( var i = 0; i < numberElements; i++ )
	{
		if ( frm.elements[i] )
		{
			object = frm.elements[i];
		
			// Important, set attribute for the element, if not, no action will effect, lyhuuloi
			object.setAttribute("id", object.name);
			
			// Add suffix
			var addsuffix = "";
			
			if ( object.getAttribute("addsuffix") )
			{
				addsuffix = object.getAttribute("addsuffix");	
			}
			
			if ( type == 1 )
			{
				object.setAttribute("autocomplete", "off");
			}
	
			if ( object.getAttribute("ehide") != 1 )
			{
				var is_float = object.parentNode.style.cssFloat ? true : false;

				var x = object.offsetLeft + object.clientWidth - 5;
				var y = is_float == true ? object.offsetTop : 0;

				if ( object.offsetParent )
				{
					if ( object.getAttribute("addsuffix") && ! object.getAttribute("emsg") )
					{
						// Check float
						if ( is_float == true )
						{
							object.parentNode.innerHTML = object.parentNode.innerHTML + "<div style='float: left; padding-left: 4px;'>"+addsuffix+"</div>";
						}
						else
						{
							object.parentNode.innerHTML = object.parentNode.innerHTML + " " + addsuffix;	
						}
						
						is_emsg = 1;
					}
					else if ( object.getAttribute("emsg") && ! document.getElementById("sympol_"+object.name) )
					{
						// Check float
						if ( is_float == true )
						{
							object.parentNode.innerHTML = object.parentNode.innerHTML + "<div style='float: left; padding-left: 4px;' id='sympol_"+object.name+"'>"+addsuffix+" <font color='red'>"+sympol+"</font></div>";
						}
						else
						{
							object.parentNode.innerHTML = object.parentNode.innerHTML + " " + addsuffix +" <font color='red'>"+sympol+"</font>";
						}
					}
				}
			}
			
			// Fix Default value for select-one and select-multi, very important :) Lyhuuloi
			object = frm.elements[i];
			
			if ( object.getAttribute("defaultvalue") )
			{
				//document.getElementById("insert").innerHTML += object.type + " + ";
				
				if ( object.type == "select-one" )
				{
					for ( var j = 0; j < object.length; j++ )
					{
						if ( object.options[j].value == object.getAttribute("defaultvalue") )
						{
							object.options[j].selected = true;
	
							break;
						}
					}
				}
				else if ( object.type == "radio" || object.type == "checkbox" )
				{
					if ( object.value == object.getAttribute("defaultvalue") )
					{
						object.checked = "checked";	
					}
				}
			}
	
			if ( marked == 1 )
			{
				if ( object.value && object.name != "submit" && object.type != "button" )
				{
					object.style.border = "solid #FFCC00 1px";
					object.style.background = "#FFFFCC";
					object.style.color = "#333333";
					object.style.fontWeight = "bold";
				}
			}
	
			//document.getElementById("insert").innerHTML += object.name + " + " + object.getAttribute("defaultvalue") + " + " + object.value + "<br />";
		}
	}
	
	if ( is_emsg == 1 )
	{
		//document.writeln("<font style='color: #FF0000'>"+sympol+"</font> " + lang_required_field);
	}
}

// lyhuuloi foundation date 23/1/2008, edited: 25/06/2009
function password_change( data )
{
	close_warning();
	
	var point = 0;
	var value = data.value;
	var simple = new Array("123456", "1234567", "12345678", "123456789", "321654", "654987", "321654987", "654321", "987654321");
	var special = new Array("!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ",", ".", ";", "/", "|", "`", "~", "?", "<", ">", ":", "+", "-");
	
	if ( value.length > 0 )
	{
		document.getElementById("password_checker").style.display = "inline";

		// step 1
		point += Math.round(value.length / 2);
	
		// step 2
		var check1 = 0;
		
		for ( var i = 0; i < simple.length-1; i++ )
		{
			if ( simple[i] == value )
			{
				check1 = 1;
			}
		}

		if ( check1 == 0 && value.length >= 6 )
		{
			point += 2;	
		}
		else
		{
			point -= 4;	
		}

		// step 3
		if ( value.length >= 6 )
		{
			for ( var i = 1; i <= 2; i++ )
			{
				// Calculate the value to filter
				var max_value = Math.round(value.length/i)*i;
				var remainder = max_value - value.length;
				var real_value = value.length - remainder;
				var value = value.substr(0, real_value);
				
				// Start filter				
				var data2 = value;
				var result = data2;

				for ( var j = 0; j <= Math.round(data2.length/i); j++ )
				{
					var result = result.replace( data2.substr(0,i), "" );
				}

				if ( result != "" )
				{
					point += 2;
				}
				else
				{
					point -= 1;
				}
			}
		}
		
		// Step 4
		if ( value.length >= 6 )
		{
			for ( var i = 0; i < special.length-1; i++ )
			{
				var str_base = value;
				var str_replace = value.replace(special[i], "");
				
				if ( str_base.length > str_replace.length )
				{
					point++;	
				}
			}
		}
	}
	else
	{
		document.getElementById("password_checker").style.display = "none";
	}

	if ( point >= 5 )
	{
		document.getElementById("pwd1").innerHTML = '<span class="password_2">&nbsp;</span>';
	}
	else
	{
		document.getElementById("pwd1").innerHTML = '<span class="password_1">&nbsp;</span>';
	}
	
	if ( point >= 10 )
	{
		document.getElementById("pwd2").innerHTML = '<span class="password_2">&nbsp;</span>';
	}
	else
	{
		document.getElementById("pwd2").innerHTML = '<span class="password_1">&nbsp;</span>';
	}
	
	if ( point >= 15 )
	{
		document.getElementById("pwd3").innerHTML = '<span class="password_2">&nbsp;</span>';
	}
	else
	{
		document.getElementById("pwd3").innerHTML = '<span class="password_1">&nbsp;</span>';
	}
	
	if ( point >= 20 )
	{
		document.getElementById("pwd4").innerHTML = '<span class="password_2">&nbsp;</span>';
	}
	else
	{
		document.getElementById("pwd4").innerHTML = '<span class="password_1">&nbsp;</span>';
	}
	
	if ( point >= 25 )
	{
		document.getElementById("pwd5").innerHTML = '<span class="password_2">&nbsp;</span>';
	}
	else
	{
		document.getElementById("pwd5").innerHTML = '<span class="password_1">&nbsp;</span>';
	}

}

//=================================================
// ALERT
//=================================================

var alert_number = 1;
var alert_refresh = 15;
var alert_max = 20;
var alert_width = 994;
var alert_hade_1 = 1;
var alert_hade_2 = 100;
var alert_padding = 2;
var alert_height = 29;
var IE = document.all ? true : false;

function alert_new( text )
{
	document.getElementById("header_alert_text").innerHTML = text;
	check_alert();
	start_alert();
	alert_sound();
}

function check_alert()
{
	if ( document.getElementById("header_alert_text").innerHTML )
	{
		document.getElementById("header_alert_sound").innerHTML = '<embed src="'+site_img_url+'/alert.wav" name="alert_sound" id="alert_sound" loop="false" autoplay="false" width="0" height="0"></embed>';
		
		if ( IE == false )
		{
			window.captureEvents(Event.LOAD);
			window.onload = alert_sound;
			window.onload = alert;
		}
		else
		{
			window.onload = alert_sound;
			window.onload = alert;	
		}
		//setTimeout("alert_sound('alert_sound')", 100);
		//setTimeout("start_alert()", 200);	
	}
}

function alertlisten(evt)
{
	key = String.fromCharCode(evt.charCode).toLowerCase();
	
	alert(key);
}

function alert_control()
{
	if ( ! document.getElementById("header_alert_text").innerHTML )
	{
		return false;
	}

	document.getElementById("header_alert").style.width = alert_width + "px";
	document.getElementById("header_alert").style.opacity = alert_number * (alert_hade_1 / alert_max);
	document.getElementById("header_alert").style.filter = "alpha(opacity="+alert_number * (alert_hade_2 / alert_max)+")";
	document.getElementById("header_alert").style.padding = alert_number * (alert_padding / alert_max) + "px";
	document.getElementById("header_alert").style.height = alert_number * (alert_height / alert_max) + "px";
		
	if( alert_number == alert_max )
	{
		return false;
	}
}

function start_alert()
{
	if ( ! document.getElementById("header_alert_text").innerHTML )
	{
		return false;
	}

	document.getElementById("header_alert").style.width = alert_width + "px";
	document.getElementById("header_alert").style.opacity = alert_number * (alert_hade_1 / alert_max);
	document.getElementById("header_alert").style.filter = "alpha(opacity="+alert_number * (alert_hade_2 / alert_max)+")";
	document.getElementById("header_alert").style.padding = alert_number * (alert_padding / alert_max) + "px";
	document.getElementById("header_alert").style.height = alert_number * (alert_height / alert_max) + "px";
		
	if( alert_number == alert_max )
	{
		alert_sound("header_alert");
		return false;
	}
		
	alert_number++;
		
	setTimeout("start_alert()", alert_refresh);
}

function closealert()
{
	if ( ! document.getElementById("header_alert_text").innerHTML )
	{
		return false;
	}
	
	document.getElementById("header_alert").style.width = alert_width + "px";
	document.getElementById("header_alert").style.opacity = alert_number * (alert_hade_1 / alert_max);
	document.getElementById("header_alert").style.filter = "alpha(opacity="+alert_number * (alert_hade_2 / alert_max)+")";
	document.getElementById("header_alert").style.padding = alert_number * (alert_padding / alert_max) + "px";
	document.getElementById("header_alert").style.height = alert_number * (alert_height / alert_max) + "px";
		
	if( alert_number == 0 )
	{
		return false;
	}
		
	alert_number--;
		
	setTimeout("closealert()", alert_refresh);
}

function openalert()
{
	if ( ! document.getElementById("header_alert").innerHTML )
	{
		return false;
	}

	document.getElementById("header_alert").style.width = alert_width + "px";
	document.getElementById("header_alert").style.opacity = alert_number * (alert_hade_1 / alert_max);
	document.getElementById("header_alert").style.filter = "alpha(opacity="+alert_number * (alert_hade_2 / alert_max)+")";
	document.getElementById("header_alert").style.padding = alert_number * (alert_padding / alert_max) + "px";
	document.getElementById("header_alert").style.height = alert_number * (alert_height / alert_max) + "px";
		
	if( alert_number == alert_max )
	{
		return false;
	}
		
	alert_number++;
		
	setTimeout("openalert()", alert_refresh);
}

function alert_delete(theURL)
{
	if (confirm( lang_alert_delete ))
	{
		window.location.href=theURL;
	}
	else
	{
		return false;	
	}
}

function alert_empty(theURL)
{
	if (confirm( lang_alert_empty ))
	{
		window.location.href=theURL;
	}
	else
	{
		return false;	
	}
}

function alert_sound(as)
{
	var as = "alert_sound";
	
	if ( IE == false )
	{
		obj = document.embeds[as];
		if(obj.Play) obj.Play();
	}
	else
	{
		document.getElementById(as).play();
	}

	return true;
}

function sharp_url()
{
	var base_url = window.location.href;
	base_url = base_url.split("#");
	
	if ( ! base_url[1] )
	{
		base_url[1] = "&";
	}
	
	return base_url;
}

function count_sharp_url()
{
	var url = sharp_url();
	
	if ( url[1] == "&" )
	{
		return false;
	}
	
	var url_data = url[1].split("&");
	
	return url_data.length;	
}

function get_sharp_url( site_view )
{
	var site_view = site_view ? site_view : "view";
	var url = sharp_url();
	var url_data = url[1].split("&");

	for ( var i = 0; i < url_data.length; i++ )
	{
		var url_detail = url_data[i].split("=");
		
		if ( site_view == url_detail[0] )
		{
			return url_detail[1];
		}
	}
	
	return false;
}

function set_sharp_url( module_name )
{
	if ( get_sharp_url() != module_name )
	{
		var base_url = sharp_url();
		var new_url = "";		
		
		if ( count_sharp_url() == false )
		{
			new_url = "#" + "view=" + module_name;
		}
		else
		{
			new_url = "#" + base_url[1] + "&view=" + module_name;
		}
		
		window.location.href = base_url[0] + new_url;
	}
	
	my_setcookie("sharp_url", new_url);
	
	return true;
}

function remove_sharp_url( module_name )
{
	var newurl = window.location.href;
	
	newurl = newurl.replace("&view=" + module_name, "");
	newurl = newurl.replace("view=" + module_name, "");
	
	my_setcookie("sharp_url", "");
	
	window.location.href = newurl;
}

function auto_sharp_url()
{
	var base_url = sharp_url();
	var cookie_sharp_url = my_getcookie("sharp_url");
	
	if ( cookie_sharp_url && cookie_sharp_url != "undefined" )
	{
		window.location.href = base_url[0] + cookie_sharp_url;
		
		my_setcookie("sharp_url", "");
	}
	
	if ( get_sharp_url() )
	{
		var data = get_sharp_url()+"();";
		eval(data);
	}
}

var default_order = "";
var default_by = "";
		
	function arrange_check( field_name, default_field )
	{
		var url_current = Url.decode(window.location.href);
		//url_current = url_current.toLowerCase();
		var url_array = url_current.split("&");
		var new_url = "";
		var remove_cnt = 1;
		
		for ( var i = 0; i < url_array.length; i++ )
		{
			var url_item = url_array[i].split("=");
			
			if ( url_item[0] == "order" )
			{
				default_order = url_item[1];
			}
			else if ( url_item[0] == "by" )
			{
				default_by = url_item[1];
			}
			else if ( url_item[0] )
			{
				new_url += url_item[0]+"="+url_item[1]+"&";
			}
		}
		
		if ( field_name == default_order )
		{
			var by = default_by == "asc" ? "desc" : "asc";
		}
		else if ( field_name == default_field )
		{
			var by = "asc";
		}
		else
		{
			var by = "desc";
		}
		
		new_url += "order=" + field_name + "&by=" + by;
		
		//document.getElementById("insert").innerHTML += new_url + " ==> " + site_url_return + "<br />" ;
		
		new_url = new_url.replace(site_url_return, "");
		new_url = new_url + site_url_return;
		
		return new_url;
	}

	function arrange_setup( sort_data )
	{
		var sort_data = sort_data.split(",");
		var default_field = sort_data[0];

		for ( var i = 0; i < sort_data.length; i++ )
		{
			if ( sort_data[i] )
			{
				var sort_item = document.getElementById("order_"+sort_data[i]);

				if ( sort_item )
				{
					sort_item.innerHTML = "<a href='"+arrange_check(sort_data[i], default_field)+"'>"+sort_item.innerHTML+"</a>";
				}
			}
		}
		
		if ( ! document.getElementById("order_" + default_field) )
		{
			return false;	
		}
		else if ( ! default_order )
		{
			document.getElementById("order_" + default_field).innerHTML += " <img align='absmiddle' src='"+site_img_url+"/desc_order.png' title='Z-A'>";
		}
		else
		{
			if ( default_by == "asc" )
			{
				document.getElementById("order_" + default_order).innerHTML += " <img align='absmiddle' src='"+site_img_url+"/asc_order.png' title='Z-A'>";
			}
			else
			{
				document.getElementById("order_" + default_order).innerHTML += " <img align='absmiddle' src='"+site_img_url+"/desc_order.png' title='Z-A'>";
			}
		}
	}
	
	function create_random_password( element_id )
	{
		var password = document.getElementById( element_id );
		
		if ( password.value )
		{
			if ( confirm( lang_create_random_password ) == false )
			{
				return false;
			}
		}
		
		var pwd_array = "0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z";
		pwd_array = pwd_array.split(" ");
		
		var new_password = "";
		
		for ( i = 0; i < 10; i ++ )
		{
			var result = Math.floor(Math.random()*pwd_array.length);
			new_password = new_password + pwd_array[result];
		}
		
		password.value = new_password;
	}
	
	function image_resize(width,height)
	{
		maxheight = width ? width : 300;
		maxwidth= height ? height : 300;
		imgs=document.getElementsByTagName("img");
		for (p=0; p<imgs.length; p++) {
		//if (imgs[p].getAttribute("alt")=="user posted image")
		//{
			w=parseInt(imgs[p].width);
			h=parseInt(imgs[p].height);
			if (parseInt(imgs[p].width)>maxwidth) {
			imgs[p].style.cursor="pointer";
			imgs[p].onclick=new Function("iw=window.open(this.src,'ImageViewer','resizable=1');iw.focus()");
			imgs[p].height=(maxwidth/imgs[p].width)*imgs[p].height;
			imgs[p].width=maxwidth;
			}
			if (parseInt(imgs[p].height)>maxheight) {
			imgs[p].style.cursor="pointer";
			imgs[p].onclick=new
			Function("iw=window.open(this.src,'ImageViewer','resizable=1');iw.focus()");

			imgs[p].width=(maxheight/imgs[p].height)*imgs[p].width;
			imgs[p].height=maxheight;
			}
			}
		//}
	}
	
	function redirect( url )
	{
		window.location.href = url;
	}
	
	
	
	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}
	
	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	
	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}
	
	function rebuild_form_as_read( form_id, type, marked )
	{
		var frm = document.forms[form_id];
		var numberElements = frm.elements.length;
		var sympol = "*";
		var is_emsg = 0;
	
		for( var i = 0; i < numberElements; i++ )
		{
			object = frm.elements[i];
			
			// Important, set attribute for the element, if not, no action will effect, lyhuuloi
			object.setAttribute("id", object.name);
			
			// Add suffix
			var addsuffix = "";
			
			if ( object.getAttribute("addsuffix") )
			{
				addsuffix = object.getAttribute("addsuffix");	
			}
			
			if ( type == 1 )
			{
				object.setAttribute("autocomplete", "off");
			}
	
			object.parentNode.innerHTML = object.parentNode.innerHTML + "<div style='float: left; padding-left: 4px;'><b>"+object.value+"</b></div>";
	
			// Fix Default value for select-one and select-multi, very important :) Lyhuuloi
			object = frm.elements[i];
	
			if ( object.getAttribute("defaultvalue") )
			{
				//document.getElementById("insert").innerHTML += object.type + " + ";
				
				if ( object.type == "select-one" )
				{
					for ( var j = 0; j < object.length; j++ )
					{
						if ( object.options[j].value == object.getAttribute("defaultvalue") )
						{
							object.options[j].selected = true;
	
							break;
						}
					}
				}
				else if ( object.type == "radio" || objec.type == "checkbox" )
				{
					if ( object.value == object.getAttribute("defaultvalue") )
					{
						object.checked = "checked";	
					}
				}
			}
			
			if ( object.selectedIndex )
			{
				object.parentNode.innerHTML = object.parentNode.innerHTML + "<div style='float: left; padding-left: 4px;'><b>"+object.options[object.selectedIndex].innerHTML+"</b></div>";
				object = frm.elements[i];
			}
	
			if ( marked == 1 )
			{
				if ( object.value && object.name != "submit" )
				{
					object.style.border = "solid #FFCC00 1px";
					object.style.background = "#FFFFCC";
					object.style.color = "#333333";
					object.style.fontWeight = "bold";
				}
			}
			
			// Hidden
			object.style.display = "none";
		}
	}
	
	function rebuild_form_as_preview( form_id, className, suffix )
	{
		var frm = document.forms[form_id];
		var numberElements = frm.elements.length;

		for( var i = 0; i < numberElements; i++ )
		{
			object = frm.elements[i];

			if ( object.name.substr(object.name.length - suffix.length) == suffix )
			{
				object.setAttribute("onkeypress", "return false;");
				object.setAttribute("class", className);
			}
		}
		
		document.getElementById("button_"+suffix.replace("_","")+"_unpreview").disabled = false;
		document.getElementById("button_"+suffix.replace("_","")+"_preview").disabled = true;
		document.getElementById("button_"+suffix.replace("_","")+"_unpreview").setAttribute("class", "input_submit");
		document.getElementById("button_"+suffix.replace("_","")+"_preview").setAttribute("class", "disable");
	}
	
	function rebuild_form_as_unpreview( form_id, className, suffix )
	{
		var frm = document.forms[form_id];
		var numberElements = frm.elements.length;

		for( var i = 0; i < numberElements; i++ )
		{
			object = frm.elements[i];

			if ( object.name.substr(object.name.length - suffix.length) == suffix )
			{
				object.setAttribute("onkeypress", "");
				object.setAttribute("class", className);
			}
		}
		
		document.getElementById("button_"+suffix.replace("_","")+"_preview").disabled = false;
		document.getElementById("button_"+suffix.replace("_","")+"_unpreview").disabled = true;
		document.getElementById("button_"+suffix.replace("_","")+"_preview").setAttribute("class", "input_submit");
		document.getElementById("button_"+suffix.replace("_","")+"_unpreview").setAttribute("class", "disable");
	}
	
	function getScrollXY() {
	  var scrOfX = 0, scrOfY = 0;
	  if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	  }
	  return [ scrOfX, scrOfY ];
	}
	
	function getInnerSize() {
	  var myWidth = 0, myHeight = 0;
	  if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	  }
	  return [ myWidth,  myHeight ];
	}
	
	function GetCenteredXY(w, h) {
		var ps = getScrollXY();
		var sz = getInnerSize();
		var Left = (sz[0] - w) / 2 + ps[0];
		var Top = (sz[1] - h) / 2 + ps[1];
		return [ Math.ceil(Left), Math.ceil(Top) ];
	}
	
	var logolhl = new Array();
	var logo_name = "";
	
	function logo_start(logo_name)
	{
		if ( ! logolhl[logo_name]['logo_data'][logolhl[logo_name]['logo_cnt']] )
		{
			logolhl[logo_name]['logo_cnt'] = 0;	
		}
		
		if ( document.getElementById("station_"+logo_name+"") )
		{
			document.getElementById("station_"+logo_name+"").innerHTML = logolhl[logo_name]['logo_data'][logolhl[logo_name]['logo_cnt']];
			logolhl[logo_name]['logo_cnt']++;
			
			if ( logolhl[logo_name]['logo_total'] == 1 )
			{
				return false;	
			}
			
			setTimeout("logo_start('"+logo_name+"')",15000);
		}
		else
		{
			setTimeout("logo_start('"+logo_name+"')",0);
		}
	}

	function handleError()
	{
		//return true;
	}

	function logo_station( element_id )
	{
		//window.onerror = handleError;
		
		if ( ! element_id.innerHTML )
		{
			return false;	
		}
		
		logo_name = element_id.id;
		logolhl[logo_name] = new Array();
		logolhl[logo_name]['logo_data'] = eval("station_"+logo_name);
		logolhl[logo_name]['logo_total'] = logolhl[logo_name]['logo_data'].length;
		logolhl[logo_name]['logo_cnt'] = Math.floor((Math.random()*logolhl[logo_name]['logo_data'].length));

		if ( logolhl[logo_name]['logo_data'][0] )
		{
			document.write("<div id='station_"+logo_name+"'></div>");
		
			logo_start(logo_name);
		}
	}
	
	function f_clientWidth() {
		return f_filterResults (
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
	}
	function f_clientHeight() {
		return f_filterResults (
			window.innerHeight ? window.innerHeight : 0,
			document.documentElement ? document.documentElement.clientHeight : 0,
			document.body ? document.body.clientHeight : 0
		);
	}
	function f_scrollLeft() {
		return f_filterResults (
			window.pageXOffset ? window.pageXOffset : 0,
			document.documentElement ? document.documentElement.scrollLeft : 0,
			document.body ? document.body.scrollLeft : 0
		);
	}
	function f_scrollTop() {
		return f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
		);
	}
	function f_filterResults(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	}

	function input_update_html(object,target)
	{
		document.getElementById(target).innerHTML = object.value;
	}
	
	// LHL-05-08-2011	
	function timer_countdown(ob, obtime, obdiff)
	{
		var minute = 0;
		var second = 0;
		var obt = document.getElementById(ob);

		if ( ! obt )
		{
			document.write("<font id='"+ob+"'></font>");
			
			obt = document.getElementById(ob);
		}
		
		minute = obtime > 0 ? Math.floor(obtime/60) : 0;
		second = obtime - (minute*60);

		if ( obtime <= 0 )
		{
			obt.innerHTML = (obdiff ? obdiff : "");
			return false;	
		}

		obt.innerHTML = minute + ":" + (second <= 9 ? "0"+second : second) + "";

		// Update timer
		setTimeout("timer_countdown('"+obt.getAttribute("id")+"', "+(parseInt(obtime)-1)+")", 1000);
	}
	
	function get_domain_name(domainname)
	{
		var domain_name = domainname.split('.');

		return domain_name[0];
	}
	
	function get_domain_ext(domainname)
	{
		var domain_name = domainname.split('.');
		var domain_ext = domainname.substring(domain_name[0].length, domainname.length);
		
		return domain_ext;
	}