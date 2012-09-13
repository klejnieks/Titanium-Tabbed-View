var header = require('ui/view/Header');
var container;

function onPostLayout(e)
{
	//HEADER
	var avatar = Ti.UI.createImageView({top:10, left:10, width:75, height:75, borderRadius:5, borderColor:'#333333', borderWidth:2, image:'http://sphotos.xx.fbcdn.net/hphotos-ash3/155879_1613196364738_4361043_n.jpg'})
	e.source.add(avatar);
	
	var name = Ti.UI.createLabel({top:10, left:100, text:'Kenneth Lejnieks'});
	e.source.add(name);
	
	var followers = Ti.UI.createLabel({top:50, left:100, text:'8'});
	e.source.add(followers);

	var followersLabel = Ti.UI.createLabel({top:70, left:100, text:'followers'});
	e.source.add(followersLabel);

	var following = Ti.UI.createLabel({top:50, left:200, text:'22'});
	e.source.add(following);

	var followingLabel = Ti.UI.createLabel({top:70, left:200, text:'following'});
	e.source.add(followingLabel);
	
	var followButton = Ti.UI.createButton({top:50, right:10, title:'follow'});
	e.source.add(followButton);
	
	
	//SEARCH BAR
	var search = Ti.UI.createSearchBar({ barColor:'#666666', showCancel:false, height:43, top:100 });
		search.container = e.source;
		search.addEventListener('return', function(e)
		{
			//onSearch(e.value);
			//search.blur();
		});
		e.source.add(search);


	//DIVIDER CONTROLLER BAR
	var controlBar = Ti.UI.createView({top:140, left:0, height:40, backgroundColor:'#FFFFFF'});
	e.source.add(controlBar);
	
		
	//LIKES
	/*
	var tmpImg = Ti.UI.createImageView({width:75, height:75, left:10, top:175, image:'http://sphotos.xx.fbcdn.net/hphotos-ash3/562569_10150843820560940_807704726_n.jpg'});
	e.source.add(tmpImg)

	var tmpImg2 = Ti.UI.createImageView({width:75, height:75, left:10, top:250, image:'http://sphotos.xx.fbcdn.net/hphotos-ash3/562569_10150843820560940_807704726_n.jpg'});
	e.source.add(tmpImg2)

	var tmpImg3 = Ti.UI.createImageView({width:75, height:75, left:10, top:325, image:'http://sphotos.xx.fbcdn.net/hphotos-ash3/562569_10150843820560940_807704726_n.jpg'});
	e.source.add(tmpImg3)

	var tmpImg4 = Ti.UI.createImageView({width:75, height:75, left:10, top:425, image:'http://sphotos.xx.fbcdn.net/hphotos-ash3/562569_10150843820560940_807704726_n.jpg'});
	e.source.add(tmpImg4)

	var tmpImg5 = Ti.UI.createImageView({width:75, height:75, left:10, top:500, image:'http://sphotos.xx.fbcdn.net/hphotos-ash3/562569_10150843820560940_807704726_n.jpg'});
	e.source.add(tmpImg5)
	
	*/
		
	e.source.removeEventListener('postlayout', onPostLayout);
}

function invalidate()
{
	header.rightButton.hide();
	header.leftButton.hide();
	header.setTitle('My Account');
	Ti.App.fireEvent('showNavigation', {data:'mainMenu'});
}

function ProfileView() 
{
	container = Ti.UI.createScrollableView({left:0, width:Ti.UI.FILL, contentHeight:'auto'});
	container.invalidate = invalidate;
	container.addEventListener('postlayout', onPostLayout);
		
	return container;
}

module.exports = ProfileView;
