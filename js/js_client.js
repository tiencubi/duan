var is_login_click = 0;

function login_form()
{
	if ( is_login_click == 0 )
	{
		document.getElementById("login_form").style.display = "block";
		is_login_click = 1;
	}
	else
	{
		document.getElementById("login_form").style.display = "none";
		is_login_click = 0;	
	}
}

function validText(value) {
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

function record_change(robject)
{
	var rvalue = robject.options[robject.selectedIndex].value;

	document.getElementById('recordoption_MX').style.display = "none";
	document.getElementById('recordoption_SRV').style.display = "none";
	
	if ( rvalue == "SRV" )
	{
		document.getElementById('recordoption_SRV').style.display = "block";
	}
	else if ( rvalue == "MX" )
	{
		document.getElementById('recordoption_MX').style.display = "block";
	}
}