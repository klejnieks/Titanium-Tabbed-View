var ITEM_HEIGHT = 50;
var ITEM_WIDTH = 64;

var self;
var mainMenuContainer;
var activeItem;
	
var mainMenu = [
	    {label:'explore', url: '/ui/view/ExploreView', icon:'/images/icons/explore_icon.png', disabledIcon:'/images/icons/explore_icon.png'},
	    {label:'services', url: '/ui/view/ServicesView', icon:'/images/icons/services_icon.png', disabledIcon:'/images/icons/services_icon.png'},
	    {label:'news', url: '/ui/view/NewsView', icon:'/images/icons/news_icon.png', disabledIcon:'/images/icons/news_icon.png'},
	    {label:'contact', url: '/ui/view/ContactUsView', icon:'/images/icons/contact_icon.png', disabledIcon:'/images/icons/contact_icon.png'},
	    {label:'account', url:'/ui/view/LoginView', icon:'/images/icons/account_icon.png', disabledIcon:'/images/icons/account_icon.png'}
	];
	

var mainNavigationItems = [];
var mainNavigationLabels = [];
var mainNavigationIcons = [];


function onClickMainMenuItem(e) 
{
	for(var i = 0; i < mainMenu.length; i++)
	{ 
		mainNavigationIcons[i].image = mainMenu[i].icon; 
		mainNavigationLabels[i].color = '#F8F8F8'; 
		mainNavigationItems[i].backgroundColor = '#333333'; 
	}
	
	mainNavigationIcons[e.source.id].image = mainMenu[e.source.id].disabledIcon; 
	mainNavigationLabels[e.source.id].color = '#FFFFFF'; 
	mainNavigationItems[e.source.id].backgroundColor = '#000000'; 
	
	var disableHeader;
	
	if( typeof(mainMenu[e.source.id].disableHeader) == 'undefined' )
	{
		disableHeader = false;
	}
	else
	{
		disableHeader = true;
	}
	Ti.App.fireEvent('loadView', {src:mainMenu[e.source.id].url, title:mainMenu[e.source.id].title, disableHeader:mainMenu[e.source.id].disableHeader});
};

function buildMainMenu()
{
	var i = 0;
	
	for(i; i < mainMenu.length; i++)
	{
		mainNavigationLabels[i] = Ti.UI.createLabel({text:mainMenu[i].label, color:'#F8F8F8', font:{fontSize:12, fontFamily:"Bryant"}, bottom:3, center:0, touchEnabled:false, textAlign:'center'});
		mainNavigationIcons[i] = Ti.UI.createImageView({image:mainMenu[i].icon, width:30, height:30, top:2, center:0, touchEnabled:false});
		
		mainNavigationItems[i] = Ti.UI.createView({id:i, height:ITEM_HEIGHT, width:ITEM_WIDTH, left:i * ITEM_WIDTH});
		mainNavigationItems[i].add(mainNavigationLabels[i]);
		mainNavigationItems[i].add(mainNavigationIcons[i]);
		mainNavigationItems[i].title = mainMenu[i].title;
		mainNavigationItems[i].addEventListener('click', onClickMainMenuItem);
		
		mainMenuContainer.add(mainNavigationItems[i]);
	}
}


function onPostLayout(e)
{
	mainMenuContainer = Ti.UI.createView({height:Ti.UI.FILL, width:Ti.UI.FILL, backgroundColor:'#333333', bottom:0, visible:true});
	self.add(mainMenuContainer);

	buildMainMenu();
	
	e.source.removeEventListener('postlayout', onPostLayout);
};


exports.showNavigation = function(menuType, isCameraType, count)
{
	switch(menuType)
	{
		case 'mainMenu':
			mainMenuContainer.show();
			break;
	}
	self.show();
}

exports.hide = function()
{
	self.hide();
}

exports.show = function()
{
	self.show();
}

exports.setActiveItem = function(item) 
{
	//title.text = value
};

exports.create = function() 
{
	self = Ti.UI.createView({height:ITEM_HEIGHT, width:Ti.UI.FILL, bottom:0});
	self.addEventListener('postlayout', onPostLayout);
	
	return self;
};

