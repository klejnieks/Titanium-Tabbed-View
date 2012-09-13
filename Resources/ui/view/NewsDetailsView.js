var model = require('ui/model/Model');
var header = require('ui/view/Header');

var container, titleText, bodyText;

function onClickBackButton(e)
{
	Ti.App.fireEvent('previousScreen');
}

function invalidate(data)
{
	header.setLeftButton('back', onClickBackButton);
	header.setTitle('News');
	
	titleText.text = data.title;
	bodyText.value = data.content;
}

function NewsDetailsView() 
{
	container = Ti.UI.createScrollView({left:0, width:Ti.UI.FILL, layout:'vertical'});
	container.invalidate = invalidate;
	
	titleText = Ti.UI.createLabel({left:20, right:20, color:'#000000', font:{fontSize:18, fontFamily:"Proxima Nova"} });
	container.add(titleText);

	bodyText = Ti.UI.createTextArea({color:'#333333', backgroundColor:'transparent', editable:false, touchEnabled:false, left:10, right:10, height:'100%', borderWidth:0, font:{fontSize:14, fontFamily:"Proxima Nova"}});
	container.add(bodyText);
	
	return container;
}

module.exports = NewsDetailsView;
