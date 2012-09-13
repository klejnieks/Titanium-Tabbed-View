var CLIENT_ID = '5rr42e9aece748bebf111015';
var CLIENT_SECRET = 'secret';

var xhr = Ti.Network.createHTTPClient();

var endpoint = "https://noroso.com/";
var model = require('ui/model/Model'); 


exports.initialize = function() 
{
	var links;

	xhr.onload = function(result) 
	{
		//var json = JSON.parse(this.responseText);               
		
		//model.setLinks(json._links);
	    
	    Ti.API.log("config loaded"); 
    	Ti.App.fireEvent('configComplete');
	};
	
	xhr.onerror = function(error) 
	{
		Ti.App.fireEvent('showAlert', {title:'Error', text:"Some Error Message"});
	}; 

	xhr.open("GET", endpoint);
	xhr.send();
}

exports.login = function(username, password, responder)	//'kenneth@lejnieks.com', 'maverick1'
{
	Ti.API.info('login');
	
    //
}

