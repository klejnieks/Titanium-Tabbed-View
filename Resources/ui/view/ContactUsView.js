var header = require('ui/view/Header');
var container;

function onPostLayout(e)
{
	var label = Ti.UI.createLabel({color:'#006699', text:'Contact Us', height:'auto', width:'auto'});
	e.source.add(label);
		
	e.source.removeEventListener('postlayout', onPostLayout);
}

function invalidate()
{
	header.rightButton.hide();
	header.leftButton.hide();
	header.setTitle('Contact Us');
	Ti.App.fireEvent('showNavigation', {data:'mainMenu'});
}

function ContactView() 
{
	container = Ti.UI.createView({left:0, width:Ti.UI.FILL});
	container.invalidate = invalidate;
	container.addEventListener('postlayout', onPostLayout);
		
	return container;
}

module.exports = ContactView;
