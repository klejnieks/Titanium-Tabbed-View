var ApplicationService = require('ui/service/ApplicationService');
var Control = require('ui/control/Controller');

Ti.App.addEventListener('configComplete', onInitialized);

function onInitialized(e)
{
	Ti.API.info('config complete handler');
	Control.createUI();
}

ApplicationService.initialize();

