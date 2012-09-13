var self;
var title;
var leftButton = Ti.UI.createButton({title:'  back', font:{fontSize:12, fontWeight:'bold'}, backgroundImage:'/images/buttons/back_button_up.png', backgroundSelectedImage:'/images/buttons/back_button_down.png', left:3, height:30, width:60, visible:false});
var rightButton = Ti.UI.createButton({title:'next', font:{fontSize:12, fontWeight:'bold'}, color:'#2F2F2F', selectedColor:'#2F2F2F', backgroundImage:'/images/buttons/next_button_up.png', backgroundSelectedImage:'/images/buttons/next_button_down.png', right:4, height:30, width:58, visible:false});

var buttonsContainer = Ti.UI.createView({width:200, height:35, center:0, visible:false});

var leftButtonResponder;
var rightButtonResponder;

var titleIsHidden = false;


function onTouchStartLeftButton(e)
{
	Ti.API.info('Left Button Clicked');	
}

function onTouchStartRightButton(e)
{
	Ti.API.info('Right Button Clicked');	
}


exports.leftButton = leftButton;
exports.rightButton = rightButton;

exports.clearRightButton = function()
{
	rightButton.title = '';
	rightButton.visible = false;
	rightButton.hide();
}

exports.clearLeftButton = function()
{
	leftButton.title = '';
	leftButton.visible = false;
	leftButton.hide();
}

exports.setRightButton = function(_title, _button, _responder)
{
	rightButton.title = _title;
	rightButton.backgroundImage = _button.up;
	rightButton.backgroundSelectedImage = _button.down;
	
	if(rightButtonResponder !== undefined)
	{
		rightButton.removeEventListener('touchstart', rightButtonResponder);
	}
	rightButtonResponder = _responder;
	rightButton.addEventListener('touchstart', rightButtonResponder);
	rightButton.visible = true;
	rightButton.show();
}

exports.setLeftButton = function(_title, _responder)
{
	leftButton.title = (_title == 'back') ? '  back' : _title;
	
	if(leftButtonResponder !== undefined)
	{
		leftButton.removeEventListener('touchstart', leftButtonResponder);
	}
	leftButtonResponder = _responder;
	leftButton.addEventListener('touchstart', leftButtonResponder);
	leftButton.visible = true;
	leftButton.show();
}

exports.setRightButtonHandler = function(r)
{
	if(rightButtonResponder !== undefined)
	{
		rightButton.removeEventListener('touchstart', rightButtonResponder);
	}
	rightButtonResponder = r
	rightButton.addEventListener('touchstart', rightButtonResponder);
}

exports.hide = function()
{
	if(rightButtonResponder !== undefined)
	{
		rightButton.removeEventListener('touchstart', rightButtonResponder);
	}
	self.hide();
}

exports.show = function()
{
	self.show();
}

exports.setTitle = function(value) 
{
	if(titleIsHidden == true)
	{
		title.show();
		titleIsHidden = false;
	}
	title.text = value
};

exports.hideTitle = function() 
{
	title.hide();
	titleIsHidden = true;
};

exports.create = function() 
{
	self = Ti.UI.createView({height:50, width:Ti.UI.FILL, backgroundColor:'#333333', top:0});
	self.add(leftButton);
	
	title = Ti.UI.createLabel({color:'#F8F8F8', text:'', width:185, textAlign:'center', font:{fontSize:20, fontFamily:"Bryant"}, center:0});
	self.add(title);
	
	self.add(rightButton);
	
	return self;
};

