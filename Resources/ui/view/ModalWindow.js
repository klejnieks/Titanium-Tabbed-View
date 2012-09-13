var container = Ti.UI.createView({left:0, top:0, width:Ti.UI.FILL, height:Ti.UI.FILL, visible:false});

var modalBackground = Ti.UI.createView({left:0, top:0, width:Ti.UI.FILL, height:Ti.UI.FILL, backgroundColor:'#000000', opacity:0.3});

var activityBackground = Ti.UI.createView({width:Ti.UI.FILL, height:Ti.UI.FILL, center:0, backgroundColor:'#000000', opacity:0.5});
var activityIndicator = Ti.UI.createActivityIndicator({center:0, height:50, width:50, style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG});
var activityLabel = Ti.UI.createLabel({text:'Saving...', bottom:15, center:0, color:'#FFFFFF', font:{fontSize:19, fontFamily:"Bryant", fontWeight:'bold'}});
var activityDialog = Ti.UI.createView({width:200, height:150, center:0, borderRadius:10});
	

exports.showActivityIndicator = function()
{
	container.visible = true;
	activityIndicator.show();
}

exports.hideActivityIndicator = function()
{
	container.visible = false;
	activityIndicator.hide();
}

exports.create = function()
{
	activityDialog.add(activityBackground);	
	activityDialog.add(activityIndicator);	
	activityDialog.add(activityLabel);
			
	container.add(modalBackground);
	container.add(activityDialog);

	return container;
}

