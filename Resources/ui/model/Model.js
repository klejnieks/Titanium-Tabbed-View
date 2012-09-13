var sampleValue = "Im a sample value";
var images = [];
var links = {};
var userToken;

var emails = [];
var phoneNumbers = [];

var fbdata = {};
var userdata = {};

Ti.Facebook.appid = "";
Ti.Facebook.permissions = ['publish_stream', 'read_stream'];


exports.userToken = userToken;

exports.getLinks = function() { return links; }
exports.setLinks = function(value)
{
	links = value;
}

exports.setItemTitle = function(index, title)
{
	if(images[index] == undefined)
	{
		images[index] = {};
	}
	images[index].title = title;
}

exports.getImages = function() { return images; }
exports.setImages = function(arr)
{
	images = arr;
}

exports.getImageAt = function(index) { return images[index]; }
exports.removeImageAt = function(index)
{
	images.splice(index, 1); 
}

exports.addImageAt = function(index, title)
{
	if(images[index] == undefined)
	{
		images[index] = {};
	}
	
	images[index].status = 'PENDING';
	images[index].title = title;
}

exports.updateImageAt = function(index, obj, status)
{
	images[index].item_image_token = obj;
	images[index].status = status;
	Ti.App.fireEvent('imageUploadComplete');
}

exports.setSampleValue = function(value) 
{
	sampleValue = value;
};

exports.setFacebookData = function(obj) 
{
	fbdata = obj;
};

exports.getUserData = function() { return userdata; }
exports.setUserData = function(obj) 
{
	userdata = obj;
};

exports.someOtherFunction = function() 
{
	alert("Model Some other function called " + sampleValue);
};

exports.sampleValue = sampleValue;

