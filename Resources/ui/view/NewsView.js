var container;
var carouselContainer;
var carousel;
var searchOnlineView;
var _views = [];

var model = require('ui/model/Model');
var header = require('ui/view/Header');

var currentEditImage;
var imageEditor;

var currentCarouselPage = 0;
var viewIsSet = false;
var hasImages = false;
var hasInitializedContacts = false;
var hasPageControl = false;
var searchIsOpen = false;



function onClickNextButton(e)
{
	Ti.App.fireEvent('nextScreen');
}

function onScroll(e)
{
	if(e.currentPage !== undefined)
	{
		if( e.currentPage != currentCarouselPage )
		{
			currentCarouselPage = e.currentPage;
			updateCaptionButton();
		}
	}
}

function createFirstView()
{
	var openCameraButton = Ti.UI.createButton({backgroundImage:'/images/buttons/ask_big_up.png', backgroundFocusedImage:'/images/buttons/ask_big_down.png', center:0, width:98, height:41});
		openCameraButton.addEventListener('click', openCameraView);

	var firstView = Ti.UI.createView({width:150, height:150, backgroundColor:'transparent'});
		firstView.add(openCameraButton);
		
	return firstView;
}

function onPostLayout(e)
{
	_views = [];
	
	var NewsListView = require('ui/view/NewsListView');
	container.addView(new NewsListView());
	
	//
	var NewsDetailsView = require('ui/view/NewsDetailsView');
	container.addView(new NewsDetailsView());

	container.removeEventListener('postlayout', onPostLayout);
}

function invalidate()
{
	//header.rightButton.hide();
	//header.setRightButton('next', {up:'/images/buttons/orange_button_up.png', down:'/images/buttons/orange_button_down.png'}, onClickNextButton);
	header.leftButton.hide();
	header.setTitle('News');
}

function NewsView() 
{
	container = Ti.UI.createScrollableView({left:0, width:Ti.UI.FILL, scrollingEnabled:false, showPagingControl:false});
	container.addEventListener('postlayout', onPostLayout);
	container.invalidate = invalidate;
	container.cacheSize = 9;
	
	return container;
}

module.exports = NewsView;
