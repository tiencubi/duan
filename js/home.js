// JavaScript Document



function domain_favorite(domain_id)
{
	
	var r=confirm("Domain này sẽ được đưa vào danh sách Domain quan tâm!")
	 if (r==true)
	  {
		  window.location = site_root_domain+"/domain/favorite/"+domain_id+".html";	
	  }
	  else
	  {
	
	  }	
}


function deldomain_favorite(domain_id)
{
	 var r=confirm("Domain này sẽ được đưa ra danh sách Domain quan tâm!")
	 if (r==true)
	  {
		  window.location = site_root_domain+"/domain/unfavorite/"+domain_id+".html";	
	  }
	  else
	  {
	
	  }
	
}
			
			
