var application, header, body, footer, model, modal;
var currentView, previousView, currentSection, previousSection;

var backButtonIsVisible = false;
var userTokenIsSet = false;
var headerIsHidden = false;

var views = [];
var sections = [];

var ApplicationService = require('ui/service/ApplicationService');


Ti.App.addEventListener('showFullscreen', showFullscreen);
Ti.App.addEventListener('hideFullscreen', hideFullscreen);
Ti.App.addEventListener('hideHeader', hideHeader);
Ti.App.addEventListener('showHeader', showHeader);
Ti.App.addEventListener('hideFooter', hideFooter);
Ti.App.addEventListener('showFooter', showFooter);
Ti.App.addEventListener('previousScreen', previousScreen);
Ti.App.addEventListener('nextScreen', nextScreen);
Ti.App.addEventListener('loadView', onLoadView);
Ti.App.addEventListener('loadSection', onLoadSection);
Ti.App.addEventListener('showNextSection', showNextSection);
Ti.App.addEventListener('removeSection', onRemoveSection);
Ti.App.addEventListener('setTitle', setTitle);
Ti.App.addEventListener('setModelData', setModelData);
Ti.App.addEventListener('doSomeOtherFunction', doSomeOtherFunction);
Ti.App.addEventListener('hideRightHeaderButton', hideRightHeaderButton);
Ti.App.addEventListener('showAlert', showAlert);
Ti.App.addEventListener('showActivityIndicator', showActivityIndicator);
Ti.App.addEventListener('hideActivityIndicator', hideActivityIndicator);
Ti.App.addEventListener('removeUserToken', removeUserToken);
	
	


function saveUserToken(token)
{
	Ti.App.Properties.setString('user_token', token);
	model.userToken = token;
}

function getUserToken()
{
	return model.userToken; 
	//Ti.App.Properties.getString('user_token');
}

function removeUserToken()
{
	Ti.App.Properties.removeProperty('user_token');
}

function showActivityIndicator()
{
	modal.showActivityIndicator();
}

function hideActivityIndicator()
{
	modal.hideActivityIndicator();
}

function showAlert(alert)
{
	var statusAlert = Ti.UI.createAlertDialog({title:alert.title, message:alert.text});
		statusAlert.show();
}

function getfileNameFromSource(src)
{
	return src.substring(src.lastIndexOf("/") + 1, src.length);
}

function setModelData(e)
{
	model.setSampleValue(e.data);
}

function doSomeOtherFunction(e)
{
	model.someOtherFunction();
}

function hideRightHeaderButton()
{
	header.rightButton.hide();
}

function enableBackButton()
{
	if(currentView.views.length > 1)
	{
		header.leftButton.show();
		if( backButtonIsVisible == false)
		{
			header.leftButton.addEventListener('touchstart', onTouchStartLeftButton);
			backButtonIsVisible = true;
		}
	}
	else
	{
		header.leftButton.hide();
		header.leftButton.removeEventListener('touchstart', onTouchStartLeftButton);
		backButtonIsVisible = false;
		header.rightButton.hide();
		showNavigation({data:'mainMenu'});
	}
}

function onRemoveSection(e)
{
	removeScreen();
}

function onTouchStartLeftButton(e)
{
	removeScreen();
}

function hideHeader()
{
	header.hide();
	headerIsHidden = true;
	body.top = 0;
}

function showHeader()
{
	header.show();
	headerIsHidden = false;
	body.top = 50;
}

function hideFooter()
{
	footer.hide();
	body.bottom = 0;
}

function showFooter()
{
	footer.show();
	body.bottom = 50;
}

function showNavigation(e)
{
	footer.showNavigation(e.data, e.isCameraType);
}

function showFullscreen(e)
{
	header.hide();
	footer.hide();
	headerIsHidden = true;
	body.top = 0;
	body.bottom = 0;
}

function hideFullscreen(e)
{
	header.show();
	footer.show();
	headerIsHidden = false;
	body.top = 50;
	body.bottom = 50;
}

function setTitle(e)
{
	header.setTitle(e.data);
}

function onLoadView(e)
{
	loadView(e.src);
}

function onLoadSection(e)
{
	loadSection(e.src, e.title, e.disableHeader, e.disableFooter);
}

function loadView(src)
{
	var name = getfileNameFromSource(src);
	
	if(typeof(currentView) !== 'undefined' )
	{
		if(currentView.name == name) return;
	}
	
	if(typeof(views[name]) !== 'undefined')
	{
		currentView.hide();
		views[name].show();
		currentView = views[name];
		currentView.fireEvent('showView');
	}
	else
	{
		var source = require(src);
		var content = new source();
			content.name = name;
		
		if(typeof(currentView) !== 'undefined' )
		{
			currentView.visible = false;
		}

		currentView = content;
		views[name] = content;
		
		body.add(content);
	}
	
	currentView.invalidate();
}

function loadSection(src, title, disableHeader, disableFooter)
{
	var name = getfileNameFromSource(src);
	
	var source = require(src);
	var content = new source();
		content.name = name;
		
	currentSection = content;
	sections[name] = content;
		
	currentView.addView(content);
	content.invalidate();
	//currentView.addEventListener('scroll', scrollToNextViewHandler);
	//currentView.scrollToView(currentView.views.length - 1);
		
	setTimeout(scrollToView, 50);
	//header.setTitle(title);
	
	//enableBackButton();
}

function nextScreen(data)
{
	currentView.getViews()[currentView.currentPage + 1].invalidate(data);
	setTimeout(scrollToNextView, 50);
}

function scrollToNextView()
{
	currentView.scrollToView(currentView.currentPage + 1);
}

function previousScreen()
{
	if(currentView.currentPage == 1)
	{
		currentView.invalidate();
	}
	else
	{
		currentView.getViews()[currentView.currentPage - 1].invalidate();
	}
	setTimeout(scrollToPreviousView, 50);
}

function scrollToPreviousView()
{
	currentView.scrollToView(currentView.currentPage - 1);
}

function scrollToView(index)
{
	currentView.scrollToView(index);
}

function showNextSection()
{
	currentView.scrollToView(currentView.views.length - 1);
}

function removeScreen()
{
	currentView.addEventListener('scroll', scrollCompleteHandler);
	currentView.scrollToView(currentView.currentPage - 1);
}

function scrollCompleteHandler(e)
{
	currentView.removeEventListener('scroll', scrollCompleteHandler);
	
	if(e.currentPage == 1)
	{
		currentView.invalidate();
	}
	else
	{
		currentView.getViews()[e.currentPage - 1].invalidate();
	}
}

function _removeView()
{
	currentView.removeView(currentView.getViews().length-1);
}

function scrollToNextViewHandler(e)
{
	currentView.removeEventListener('scroll', scrollToNextViewHandler);
	currentView.getViews()[currentView.getViews().length - 1].invalidate();
}



exports.createUI = function()
{
	model = require('ui/model/Model');

	application = Ti.UI.createWindow({backgroundColor:'#F3F3F3'});
	
	body = Ti.UI.createView({top:50, bottom:50, left:0, width:Ti.UI.FILL});
	application.add(body);

	header = require('ui/view/Header'); 
	application.add(header.create());

	footer = require('ui/view/Footer'); 
	application.add(footer.create());

	modal = require('ui/view/ModalWindow');
	application.add(modal.create());

	application.open();

	loadView('/ui/view/ExploreView');
}


