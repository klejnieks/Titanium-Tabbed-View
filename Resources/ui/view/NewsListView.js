var applicationService = require('ui/service/ApplicationService');
var header = require('ui/view/Header');
var model = require('ui/model/Model');

var url = 'http://www.lejnieks.com/feed';

var container;
var data;
var i = 0;
var feedTableView;
var feedTitle = '';

Ti.include('/ui/view/strip_tags.js');


function onClickCustomChoice(e)
{
	Ti.App.fireEvent('nextScreen');
}

function onClickBackButton(e)
{
	Ti.App.fireEvent('previousScreen');
}

function displayItems(itemList)
{
	for (var c=0; c < itemList.length; c++)
	{	
		var title = null;
		var desc = null;
		
		if(itemList.item(c).getElementsByTagName("enclosure")!=null)
		{
			title = itemList.item(c).getElementsByTagName("title").item(0).text;
			desc = itemList.item(c).getElementsByTagName("description").item(0).text;
			title = title.replace(/\n/gi, " ");			
			//desc = desc;//.replace(/\n/gi, " ");

			var row = Ti.UI.createTableViewRow({height:'auto', backgroundColor:'transparent', selectedBackgroundColor:'#006699'}); 
			var post_title = Ti.UI.createLabel({text:title, color:'#333333', left:10, height:'auto', width:'auto', top:20, font:{fontWeight:'bold',fontSize:13} });

			row.add(post_title);
			row.thisTitle = title;
			row.thisDesc = desc;
			
			data[i] = row;
			i++;
		}		
	}
	
	// create the table
	var tableview = Ti.UI.createTableView({ data:data, top:0, backgroundColor:'transparent', separatorStyle:'none'});
		tableview.addEventListener('click', function(e)
		{
			var row = e.row;
			var rowdata = e.rowData;
			
			Ti.API.info('item index clicked :'+e.index);
			Ti.API.info('title  :'+e.rowData.thisTitle);
			Ti.API.info('description  :'+strip_tags(e.rowData.thisDesc));
			
			var pageData = {title:e.rowData.thisTitle, content:strip_tags(e.rowData.thisDesc)};
			
			Ti.App.fireEvent('nextScreen', pageData);
		});
	
	container.add(tableview);
}

function loadRSSFeed(url)
{
	data = [];
	
	var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET',url);
		xhr.onload = function()
		{
			var xml = this.responseXML;
			var channel = xml.documentElement.getElementsByTagName("channel");
	
			feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;
			
			Ti.API.info("FEED TITLE " + feedTitle);
			
			header.setTitle('News ' + feedTitle);
	
			var itemList = xml.documentElement.getElementsByTagName("item");
	
			// Now add the items to a tableView
			displayItems(itemList);
		};
		
		xhr.send();	
}

function NewsListView() 
{
	container = Ti.UI.createView({left:0, width:Ti.UI.FILL});
	
	header.setLeftButton('back', onClickBackButton);
	header.rightButton.hide();
	header.setTitle('News');
	
	loadRSSFeed(url);
	
	return container;
}

module.exports = NewsListView;
