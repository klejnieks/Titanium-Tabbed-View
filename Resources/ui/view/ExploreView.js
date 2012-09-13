var container;
var header = require('ui/view/Header');
	

function onClickRemoveUserToken(e)
{
	Ti.App.fireEvent('removeUserToken');  
}

function onPostLayout(e)
{
	var label3 = Ti.UI.createLabel({ color:'#006699', text:'Set Title', height:45});
		label3.addEventListener('click', function(e) { Ti.App.fireEvent('setTitle', {data:'New Title'}); });
		e.source.add(label3);
	
	var label4 = Ti.UI.createLabel({ color:'#006699', text:'Set Model Data', height:45});
		label4.addEventListener('click', function(e) {Ti.App.fireEvent('setModelData', {data:'Random Value'}); });
		e.source.add(label4);

	var label4a = Ti.UI.createLabel({ color:'#006699', text:'Remove user Token', height:45});
		label4a.addEventListener('click', onClickRemoveUserToken);
		e.source.add(label4a);

	var label6 = Ti.UI.createLabel({ color:'#006699', text:'Execute Some Function in Model', height:45});
		label6.addEventListener('click', function(e) { Ti.App.fireEvent('doSomeOtherFunction'); });
		e.source.add(label6);
	
	var label8 = Ti.UI.createLabel({ color:'#006699', text:'Hide Header', height:45});
		label8.addEventListener('click', function(e) {
				Ti.App.fireEvent('hideHeader'); 
			});
		e.source.add(label8);

	var label9 = Ti.UI.createLabel({ color:'#006699', text:'Show Header', height:45});
		label9.addEventListener('click', function(e) {
				Ti.App.fireEvent('showHeader'); 
			});
		e.source.add(label9);
	
	var label10 = Ti.UI.createLabel({ color:'#006699', text:'Hide Footer', height:45});
		label10.addEventListener('click', function(e) {
				Ti.App.fireEvent('hideFooter'); 
			});
		e.source.add(label10);

	var label11 = Ti.UI.createLabel({ color:'#006699', text:'Show Footer', height:45});
		label11.addEventListener('click', function(e) {
				Ti.App.fireEvent('showFooter'); 
			});
		e.source.add(label11);
	
	var label12 = Ti.UI.createLabel({ color:'#006699', text:'Show Fullscreen', height:45});
		label12.addEventListener('click', function(e) {
				Ti.App.fireEvent('showFullscreen'); 
			});
		e.source.add(label12);

	var label13 = Ti.UI.createLabel({ color:'#006699', text:'Hide Fullscreen', height:45});
		label13.addEventListener('click', function(e) {
				Ti.App.fireEvent('hideFullscreen'); 
			});
		e.source.add(label13);

	e.source.removeEventListener('postlayout', onPostLayout);
}

function invalidate()
{
	header.rightButton.hide();
	header.leftButton.hide();
	header.setTitle('Explore');
}

function ExploreView() 
{
	container = Ti.UI.createScrollView({left:0, width:Ti.UI.FILL, contentHeight:'auto', layout:'vertical', touchEnabled:true, showVerticalScrollIndicator:true});
	container.invalidate = invalidate;
	container.addEventListener('postlayout', onPostLayout);
	
	return container;
}

module.exports = ExploreView;
