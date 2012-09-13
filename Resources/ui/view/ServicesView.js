var header = require('ui/view/Header');
var container;

function onPostLayout(e)
{
	var label = Ti.UI.createLabel({color:'#006699', text:'Cloud Services', height:'auto', width:'auto'});
	e.source.add(label);
		
	e.source.removeEventListener('postlayout', onPostLayout);
}

function invalidate()
{
	header.rightButton.hide();
	header.leftButton.hide();
	header.setTitle('Services');
}

function ServicesView() 
{
	container = Ti.UI.createView({backgroundColor:'#FF3333', left:0, width:Ti.UI.FILL, opacity:0.5});
	container.invalidate = invalidate;
	container.addEventListener('postlayout', onPostLayout);
		
	return container;
}

module.exports = ServicesView;
